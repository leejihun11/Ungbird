/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.getMeal = (req, res) => {


    if(req.get('content-type') !== 'application/x-www-form-urlencoded'){
        res.status(200).json({"messages": [{"text" : "HTTP ErrorNot POST!"}]});
    } else if (req.body.date === undefined) {
        res.status(200).json({"messages": [{"text": "Input type Error : undefined"}]});
    } else {

        var request = require('request');
        var cheerio = require('cheerio');
        var Iconv = require('iconv').Iconv;

        var date = req.body.date;

        var options = {
            uri: 'http://pusanjin.hs.kr/asp/food/FOOD_1001/main.html?siteid=pusanjinhs&boardid=food&uid=' + date + '&pagemode=view',
            encoding: null
        };


        request(options, function (error, response, body) {


            if (error) {
                res.status(200).json({"messages": [{"text": "Req err : "+error}]});
            } else {
                var iconv = new Iconv('euc-kr', 'utf-8');
                const html = iconv.convert(body).toString();

                const $ = cheerio.load(html,{decodeEntities: false});
                const text$ = $("tr").find("td").find("table").find("tr").find("td").find("b");
                const image$ = $('img');

                var lunch = text$.eq(0).html();
                var dinner = text$.eq(1).html();

                var lunch_img = image$.eq(3).attr('src');
                var dinner_img = image$.eq(5).attr('src');

                var year = date.substr(0,4);
                var month = date.substr(4,2);
                var day = date.substr(6,2);

                var lunch_msg = year + "년 " + month + "월 " + day + "일의 점심 메뉴는 " + lunch + "입니다.";
                var dinner_msg = year + "년 " + month + "월 " + day + "일의 저녁 메뉴는 " + dinner + "입니다.";
                var lunch_img_url = "http://pusanjin.hs.kr" + lunch_img;
                var dinner_img_url = "http://pusanjin.hs.kr" + dinner_img;

                var lunch_msg_json = {"text" : lunch_msg};
                var dinner_msg_json = {"text" : dinner_msg};
                var lunch_img_json = {
                    "attachment": {
                        "type": "image",
                        "payload": {
                            "url": lunch_img_url
                        }
                    }
                };
                var dinner_img_json = {
                    "attachment": {
                        "type": "image",
                        "payload": {
                            "url": dinner_img_url
                        }
                    }
                };

                var range 
                var json_content = [];

                for i in ranges





            }
        });
    }


  };
  