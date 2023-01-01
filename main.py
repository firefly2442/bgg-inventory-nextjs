import requests, json, time, os
from xml.etree import ElementTree
from html import unescape

try:
    f = open('inventory.json', 'r')
    try:
        data = json.load(f)
    finally:
        f.close()

    allgames = []
    for i, game in enumerate(data['boardgames']):
        print(str(i+1) + " / " + str(len(data['boardgames'])))
        # https://boardgamegeek.com/wiki/page/BGG_XML_API2
        # example for Pandemic:
        # https://www.boardgamegeek.com/xmlapi2/thing?id=30549&stats=1
        # returns XML data
        r = requests.get(requests.Request('GET', "https://www.boardgamegeek.com/xmlapi2/thing", params={'id':game['id'], 'stats':'1'}).prepare().url)
        if (r.ok):
            gameobj = {}
            tree = ElementTree.fromstring(r.content)
            item = tree.find('item')
            gameobj = item.attrib
            img = item.find('thumbnail')
            thumbnail = requests.get(requests.Request('GET', img.text).prepare().url)
            if (thumbnail.ok):
                # get image file extension
                extensions = os.path.splitext(img.text)
                tb = open('./public/thumbnails/'+game['id']+extensions[1], 'wb')
                try:
                    tb.write(thumbnail.content)
                finally:
                    tb.close()
                gameobj['thumbnailextension'] = extensions[1]
            else:
                print("ERROR: thumbnail status code: " + str(thumbnail.status_code))
            # use the primary official name from BGG
            for n in item.findall('name'):
                if n.attrib['type'] == "primary":
                    gameobj['name'] = n.attrib['value']
            gameobj['description'] = unescape(item.find('description').text).replace("\n", "")
            gameobj['yearpublished'] = item.find('yearpublished').attrib['value']
            gameobj['minplayers'] = item.find('minplayers').attrib['value']
            gameobj['maxplayers'] = item.find('maxplayers').attrib['value']
            gameobj['playingtimemins'] = item.find('playingtime').attrib['value']
            gameobj['tags'] = []
            for tag in item.findall('link'):
                if tag.attrib['type'] in ['boardgamecategory', 'boardgamemechanic']:
                    gameobj['tags'].append(tag.attrib['value'])
            gameobj['usersrated'] = item.find('statistics').find('ratings').find('usersrated').attrib['value']
            # 1 - 10 scoring
            gameobj['averagerating'] = item.find('statistics').find('ratings').find('average').attrib['value']
            allgames.append(gameobj)
        else:
            print("ERROR: XML API status code: " + str(r.status_code))

        # be nice so we don't thrash BGG
        time.sleep(0.40)

    # alphabetize list of dictionaries by name
    allgames = sorted(allgames, key = lambda i: i['name'])

    # write JSON file
    with open('./allgames.json', "w") as outfile:  
        json.dump(allgames, outfile, indent=4) 

except Exception as e:
    print("ERROR: " + str(e))