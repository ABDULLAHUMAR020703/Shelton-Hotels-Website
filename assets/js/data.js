/* =========================================================
   SHELTON HOTELS — branch data
   Fill in / correct as real details come in. `whatsapp` should
   be in international format with no + or spaces, e.g. "923366111169".
   Leave whatsapp as "" if not yet available — the booking modal
   will fall back to email-only for that branch.

   photos.hasThumb — set to false when a folder has no _t.jpg
   thumbnail variants (all SHELTON/* folders). The gallery
   renderer uses the full-size image as the thumbnail in that case.
   ========================================================= */

const GENERAL_BOOKING_EMAIL = "Bookings@tmhotels.com";

const BRANCHES = [
  // ---------------- LAHORE ----------------
  { id:"lhe-rezidor", city:"Lahore", name:"Shelton's Rezidor Lahore", area:"Gulberg",
    address:"71-C Main Boulevard Gulberg, near Siddique Trade Center, Block H, Gulberg 2, Lahore, 54000",
    phone:"042-35957400", whatsapp:"923366111169", rating:4.1, reviews:472, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Sheltons Rezidor",
      hero:"FWD05869.jpg",
      card:"FWD05869.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD05869","FWD05870","FWD05872","FWD05873"],
        "lobby"    :["FWD05874","FWD05875","FWD05876","FWD05877","FWD05878"],
        "room-standard":["FWD05879","FWD05880","FWD05881","FWD05882","FWD05883","FWD05884"],
        "room-deluxe"  :["FWD05886","FWD05887","FWD05888","FWD05889","FWD05890","FWD05891","FWD05892","FWD05893"],
        "bathroom" :["FWD05894","FWD05895","FWD05896","FWD05897"],
        "dining"   :["FWD05899","FWD05904","FWD05906"],
        "hall"     :["FWD05909","FWD05910","FWD05913","FWD05914"],
        "other"    :["FWD05915","FWD05916","FWD05917","FWD05918","FWD05919","FWD05920","FWD05921",
                     "FWD05922","FWD05923","FWD05925","FWD05926","FWD05927","FWD05928","FWD05930",
                     "FWD05931","FWD05933","FWD05935","FWD05936","FWD05937"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Restaurant","Free WiFi","Conference hall","Free parking","Room service"] },

  { id:"lhe-boulevard", city:"Lahore", name:"Shelton Boulevard Hotel Lahore", area:"Johar Town",
    address:"17 Main Nazaria-e-Pakistan Ave, Block K, Phase 2, Johar Town, Lahore",
    phone:"042-35957400", whatsapp:"923366111169", rating:4.2, reviews:240, type:"hotel" },

  { id:"lhe-shelton", city:"Lahore", name:"Shelton Hotel Lahore", area:"Johar Town",
    address:"225 Ibraheem Bukhari Rd, J3 Block, Phase 2, Johar Town, Lahore",
    phone:"042-35957400", whatsapp:"923366111169", rating:4.1, reviews:1200, type:"hotel" },

  // ---------------- ISLAMABAD ----------------
  { id:"isb-house", city:"Islamabad", name:"Shelton House Islamabad", area:"F-8/3",
    address:"House No. 54, Street 5, Sector F-8/3, Islamabad, 44000",
    phone:"051-2856331", whatsapp:"923366111169", rating:4.0, reviews:1100, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Isb F8",
      hero:"FWD06123.jpg",
      card:"FWD06123.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD06123","FWD06124","FWD06125","FWD06126"],
        "lobby"    :["FWD06127","FWD06129","FWD06130","FWD06131","FWD06132"],
        "room-standard":["FWD06133","FWD06134","FWD06135","FWD06136","FWD06137","FWD06138"],
        "room-deluxe"  :["FWD06139","FWD06140","FWD06141","FWD06142","FWD06143","FWD06144","FWD06145","FWD06147"],
        "bathroom" :["FWD06148","FWD06149","FWD06150","FWD06151"],
        "dining"   :["FWD06152","FWD06153","FWD06154"],
        "hall"     :["FWD06155","FWD06156","FWD06157","FWD06159"],
        "other"    :["FWD06160","FWD06161","FWD06162","FWD06164","FWD06165","FWD06166","FWD06167",
                     "FWD06168","FWD06169","FWD06170","FWD06171","FWD06173","FWD06174","FWD06175",
                     "FWD06176","FWD06177","FWD06178","FWD06179"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Free parking","Laundry","CCTV"] },

  /*
  { id:"isb-rezidor", city:"Islamabad", name:"Shelton's Rezidor Islamabad", area:"F-7/1",
    address:"House No. 3, Street No. 30, F-7/1, Islamabad",
    whatsapp:"923366111169", rating:null, reviews:null, type:"hotel" },
  */

  { id:"isb-ambassador", city:"Islamabad", name:"Shelton's Ambassador", area:"Blue Area",
    address:"Block 111 West A.K, AKM Fazl-ul-Haq Rd, G-7/2 Blue Area, Islamabad, 44000",
    phone:"+92 336 6111169", whatsapp:"923366111169", rating:4.2, reviews:606, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Blue Area",
      hero:"FWD06250.jpg",
      card:"FWD06250.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD06250","FWD06251","FWD06252","FWD06253","FWD06254"],
        "lobby"    :["FWD06255","FWD06256","FWD06257","FWD06258","FWD06259","FWD06260"],
        "room-standard":["FWD06261","FWD06262","FWD06264","FWD06265","FWD06266","FWD06267","FWD06268"],
        "room-deluxe"  :["FWD06269","FWD06270","FWD06271","FWD06272","FWD06273","FWD06274","FWD06275",
                          "FWD06276","FWD06277","FWD06278"],
        "bathroom" :["FWD06279","FWD06281","FWD06283","FWD06284"],
        "dining"   :["FWD06285","FWD06286","FWD06287","FWD06288"],
        "hall"     :["FWD06291","FWD06293","FWD06294","FWD06296"],
        "other"    :["FWD06298","FWD06299","FWD06300","FWD06301","FWD06302","FWD06303","FWD06304",
                     "FWD06305","FWD06306","FWD06307","FWD06308","FWD06309","FWD06310","FWD06311",
                     "FWD06312","FWD06313","FWD06314","FWD06315","FWD06316","FWD06317","FWD06318",
                     "FWD06319","FWD06320","FWD06321","FWD06322","FWD06323","FWD06324","FWD06325",
                     "FWD06326","FWD06327","FWD06328","FWD06332","FWD06333","FWD06334"]
      }
    },
    roomTypes:["Standard","Deluxe","Executive"],
    features:["Restaurant","Free WiFi","Conference hall","Room service","Free parking"] },

  /*
  { id:"isb-boulevard", city:"Islamabad", name:"Shelton Boulevard Islamabad", area:"F-7/4",
    address:"House 11-A, Street 54, F-7/4, Islamabad, 44000",
    whatsapp:"923366111169", rating:4.3, reviews:143, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton F7",
      hero:"FWD06182.jpg",
      card:"FWD06182.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD06182","FWD06183","FWD06184","FWD06185"],
        "lobby"    :["FWD06186","FWD06187","FWD06190","FWD06191","FWD06192"],
        "room-standard":["FWD06193","FWD06195","FWD06196","FWD06197","FWD06198","FWD06199","FWD06200"],
        "room-deluxe"  :["FWD06201","FWD06202","FWD06203","FWD06204","FWD06206","FWD06207","FWD06208","FWD06209"],
        "bathroom" :["FWD06210","FWD06211","FWD06213","FWD06214"],
        "dining"   :["FWD06215","FWD06216","FWD06217"],
        "hall"     :["FWD06218","FWD06219","FWD06220","FWD06221"],
        "other"    :["FWD06222","FWD06223","FWD06225","FWD06226","FWD06227","FWD06228","FWD06229",
                     "FWD06230","FWD06231","FWD06232","FWD06233","FWD06234","FWD06235","FWD06236",
                     "FWD06237","FWD06240","FWD06241","FWD06242","FWD06243","FWD06244","FWD06245",
                     "FWD06246","FWD06247","FWD06248","FWD06249"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Laundry","Free parking","CCTV"] },
  */

  { id:"isb-penthouse", city:"Islamabad", name:"Penthouse by Shelton", area:"Islamabad Expressway",
    address:"Islamabad Expy, Islamabad, 44000",
    phone:"+92 336 6111169", whatsapp:"923366111169", rating:4.6, reviews:27, type:"apartment",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Penthouse",
      hero:"3114a8ae73e886008daa95f5dd67ef60.jpeg",
      card:"3114a8ae73e886008daa95f5dd67ef60.jpeg",
      hasThumb:false,
      rawNames:true,
      groups:{
        "exterior" :["3114a8ae73e886008daa95f5dd67ef60.jpeg","6a0e5d6b7cb2aa94fe176970f4d5d2bd.jpeg"],
        "lobby"    :["385009530.webp","385009643.webp"],
        "room-deluxe":["9c325cb045a497723ffb51066e71d4ef.jpeg","9cf30cc7a28162f49acf0445ed5f3202.jpeg","cc4958f29ccd27400a06be7ef6dfdd1a.jpeg","ee7b4d1947af51802e32f08dd249f4ac.jpeg"],
        "bathroom" :["385009586.webp","385009593.webp"],
        "dining"   :["385009618.webp","b121ab91db2cf02eb4889e47d24dbe53.jpeg"],
        "other"    :["16de57f5d186af91b969a7bd84644d22.jpeg"]
      }
    },
    roomTypes:["Studio","Deluxe Apartment"],
    features:["Free WiFi","Full kitchen","Free parking","City views","Room service"] },

  // ---------------- RAWALPINDI ----------------
  { id:"rwp-banquet", city:"Rawalpindi", name:"Shelton Hotel and Banquet Hall", area:"Fazal Town",
    address:"J439+V7G, Service Rd, Fazal Town, Rawalpindi, 46000",
    phone:"051-5705962", whatsapp:"", rating:4.0, reviews:1200, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Hotel Rawalpindi",
      hero:"IMG_3974.jpg",
      card:"IMG_3974.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["IMG_3974","IMG_3975","IMG_3977","IMG_3979","IMG_3981"],
        "lobby"    :["IMG_3983","IMG_3986","IMG_3989","IMG_3992","IMG_3993"],
        "room-standard":["IMG_3995","IMG_3998","IMG_4001","IMG_4006","IMG_4010"],
        "room-deluxe"  :["IMG_4013","IMG_4015","IMG_4017","IMG_4020","IMG_4021","IMG_4028"],
        "bathroom" :["IMG_4031","IMG_4034","IMG_4035","IMG_4036"],
        "dining"   :["IMG_4040","IMG_4046","IMG_4047"],
        "hall"     :["IMG_4049","IMG_4053","IMG_4054","IMG_4055"],
        "other"    :["IMG_4063","IMG_4065"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Banquet hall","Restaurant","Free WiFi","Free parking","Room service"] },

  // ---------------- PESHAWAR ----------------
  { id:"pew-rezidor", city:"Peshawar", name:"Shelton's Rezidor Peshawar", area:"Tehkal",
    address:"Main University Rd, opposite Total Parco Pump, Tehkal, Peshawar, 25000",
    phone:"0915701201", whatsapp:"", rating:null, reviews:null, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Rezidor Peshawar",
      hero:"IMG_2732.jpg",
      card:"IMG_2732.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["IMG_2732","IMG_2740","IMG_2744","IMG_2748"],
        "lobby"    :["IMG_2752","IMG_2755","IMG_2759","IMG_2763"],
        "room-standard":["IMG_2766","IMG_2770","IMG_2771","IMG_2778","IMG_2785"],
        "room-deluxe"  :["IMG_2789","IMG_2790","IMG_2794","IMG_2796","IMG_2799","IMG_2800","IMG_2806","IMG_2808"],
        "bathroom" :["IMG_2810","IMG_2813","IMG_2816","IMG_2817"],
        "dining"   :["IMG_2823","IMG_2829","IMG_2837"],
        "hall"     :["IMG_2843","IMG_2848","IMG_2852","IMG_2854"],
        "other"    :["IMG_2858","IMG_2866","IMG_2871","IMG_2875","IMG_2884","IMG_2894","IMG_2899","IMG_2906","IMG_2907"]
      }
    },
    rooms:[{name:"Standard Room",detail:"Sleeps 3",from:16675},{name:"Twin Room",detail:"Twin bed, sleeps 3",from:20815}],
    features:["Free WiFi","Room service","Free parking","Restaurant"] },

  { id:"pew-legacy", city:"Peshawar", name:"Shelton Legacy Hotel", area:"University Town",
    address:"Syed Jamal-ud-din Afghani Lane, House 37-D3, Circular Rd, University Town, Peshawar, 25000",
    phone:"091-5844414", whatsapp:"", rating:4.6, reviews:43, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Accom",
      hero:"FWD05719.jpg",
      card:"FWD05719.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD05719","FWD05720","FWD05721"],
        "lobby"    :["FWD05722","FWD05723","FWD05724"],
        "room-standard":["FWD05725","FWD05726","FWD05728","FWD05729"],
        "room-deluxe"  :["FWD05730","FWD05731","FWD05732","FWD05733","FWD05734"],
        "bathroom" :["FWD05736","FWD05738","FWD05739"],
        "dining"   :["FWD05740","FWD05741"],
        "other"    :["FWD05742","FWD05743","FWD05744","FWD05745"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Free parking","Laundry"] },

  { id:"pew-accommodator", city:"Peshawar", name:"Shelton's Accommodator Peshawar", area:"University Town",
    address:"1 Rehman Baba Rd, University Town, Peshawar",
    phone:"091-5846627", whatsapp:"", rating:4.1, reviews:733, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Accommodator Peshawar",
      hero:"IMG_2656.jpg",
      card:"IMG_2656.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["IMG_2656","IMG_2657","IMG_2658","IMG_2661"],
        "lobby"    :["IMG_2663","IMG_2665","IMG_2670","IMG_2672"],
        "room-standard":["IMG_2675","IMG_2681","IMG_2682","IMG_2686"],
        "room-deluxe"  :["IMG_2688","IMG_2689","IMG_2691","IMG_2695","IMG_2697","IMG_2698"],
        "bathroom" :["IMG_2702","IMG_2704","IMG_2709"],
        "dining"   :["IMG_2711","IMG_2712"],
        "other"    :["IMG_2718","IMG_2721","IMG_2724","IMG_2725","IMG_2727","IMG_2730"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Free parking","Laundry","CCTV"] },

  { id:"pew-vip", city:"Peshawar", name:"VIP House Peshawar", area:"University Town",
    address:"XGV4+XJ8, Old Bara Rd, University Town, Peshawar, 25000",
    phone:"+92 91 5843392", whatsapp:"", rating:4.2, reviews:1600, type:"hotel",
    photos:{
      dir:"assets/img/branches/pew-vip",
      hero:"hero.jpg",
      card:"card.jpg",
      groups:{
        "exterior"    :["2499","2516","2525","2649"],
        "lobby"       :["2625","2629","2636","2639"],
        "room-standard":["2538","2539","2542","2627"],
        "room-deluxe" :["2546","2547","2550","2558","2562","2564","2620","2623"],
        "room-suite"  :["2576","2579","2580","2582"],
        "bathroom"    :["2553","2567","2570","2614"],
        "dining"      :["2522","2535","2537"],
        "hall"        :["2642","2645","2656","2657","2658"],
        "other"       :["2533","2586","2609"]
      }
    },
    roomTypes:["Standard","Deluxe","Suite"],
    features:["Restaurant","Conference hall","Garden seating","Free parking"] },

  { id:"pew-house", city:"Peshawar", name:"Shelton House Peshawar", area:"University Town",
    address:"71 Abdara Rd, University Town, Peshawar, 25000",
    phone:"091-5842594", whatsapp:"", rating:4.2, reviews:1200, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton House Peshawar",
      hero:"IMG_2267.jpg",
      card:"IMG_2267.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["IMG_2267","IMG_2268","IMG_2272","IMG_2290"],
        "lobby"    :["IMG_2293","IMG_2295","IMG_2306","IMG_2316","IMG_2319-Edit"],
        "room-standard":["IMG_2321","IMG_2322-Edit-Edit","IMG_2330","IMG_2337","IMG_2344","IMG_2346","IMG_2348"],
        "room-deluxe"  :["IMG_2358","IMG_2359","IMG_2365","IMG_2368","IMG_2379","IMG_2382","IMG_2389","IMG_2391"],
        "room-suite"   :["IMG_2407","IMG_2411","IMG_2414","IMG_2419"],
        "bathroom" :["IMG_2421","IMG_2424","IMG_2431","IMG_2435","IMG_2437"],
        "dining"   :["IMG_2440","IMG_2445","IMG_2448-Edit"],
        "hall"     :["IMG_2449-Edit","IMG_2450","IMG_2459","IMG_2469"],
        "other"    :["IMG_2470","IMG_2472","IMG_2474","IMG_2480-Edit","IMG_2482","IMG_2484","IMG_2486","IMG_2489"]
      }
    },
    roomTypes:["Standard","Deluxe","Suite"],
    features:["Free WiFi","Restaurant","Conference hall","Room service","Free parking"] },

  { id:"pew-rezidor-house", city:"Peshawar", name:"Shelton Rezidor House Peshawar", area:"University Town",
    address:"77E Rehman Baba Rd, University Town, Peshawar, 25000",
    phone:"091-5701201", whatsapp:"", rating:4.0, reviews:539, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Rezidor House Pesahwar",
      hero:"FWD05639.jpg",
      card:"FWD05639.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD05639","FWD05640","FWD05641","FWD05642","FWD05643"],
        "lobby"    :["FWD05644","FWD05645","FWD05646","FWD05647","FWD05648","FWD05650"],
        "room-standard":["FWD05652","FWD05654","FWD05655","FWD05656","FWD05657","FWD05658","FWD05659"],
        "room-deluxe"  :["FWD05660","FWD05661","FWD05662","FWD05665","FWD05666","FWD05667","FWD05668","FWD05669","FWD05670"],
        "bathroom" :["FWD05672","FWD05673","FWD05674","FWD05675","FWD05676"],
        "dining"   :["FWD05677","FWD05678","FWD05680","FWD05681"],
        "hall"     :["FWD05682","FWD05683","FWD05684","FWD05687","FWD05688"],
        "other"    :["FWD05689","FWD05690","FWD05691","FWD05693","FWD05694","FWD05695",
                     "FWD05706","FWD05707","FWD05708","FWD05709","FWD05710","FWD05712",
                     "FWD05714","FWD05715","FWD05717"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Free parking","Laundry","CCTV"] },

  // ---------------- SWAT ----------------
  { id:"swat-rezidor", city:"Swat", name:"Shelton's Rezidor Swat", area:"Mingora",
    address:"Mingora, Swat",
    phone:"0946-813006", whatsapp:"", rating:4.1, reviews:1300, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Sheltons Rezidor Swat",
      hero:"20170421-IMG_9045.JPG",
      card:"20170421-IMG_9045.JPG",
      hasThumb:false,
      ext:"JPG",
      groups:{
        "exterior" :["20170421-_MG_9125","20170421-_MG_9133","20170421-_MG_9134","20170421-_MG_9135"],
        "lobby"    :["20170421-_MG_9136","20170421-_MG_9141","20170421-_MG_9145","20170421-_MG_9150"],
        "room-standard":["20170421-IMG_9045","20170421-IMG_9047","20170421-IMG_9048","20170421-IMG_9049",
                          "20170421-IMG_9052","20170421-IMG_9053","20170421-IMG_9054"],
        "room-deluxe"  :["20170421-IMG_9055","20170421-IMG_9065","20170421-IMG_9066","20170421-IMG_9069",
                          "20170421-IMG_9070","20170421-IMG_9073","20170421-IMG_9075","20170421-IMG_9076"],
        "bathroom" :["20170421-IMG_9077","20170421-IMG_9079","20170421-IMG_9080","20170421-IMG_9081"],
        "dining"   :["20170421-IMG_9082","20170421-IMG_9085","20170421-IMG_9088","20170421-IMG_9089"],
        "hall"     :["20170421-IMG_9094","20170421-IMG_9096","20170421-IMG_9097","20170421-IMG_9102"],
        "other"    :["20170421-IMG_9104","20170421-IMG_9106","20170421-IMG_9109","20170421-IMG_9111",
                     "20170421-IMG_9113","20170421-IMG_9115","20170421-IMG_9116","20170421-IMG_9117",
                     "20170421-IMG_9120","20170421-IMG_9151","20170421-IMG_9153","20170421-IMG_9154",
                     "20170421-IMG_9156","20170421-IMG_9159","20170421-IMG_9160","20170421-IMG_9161",
                     "20170421-IMG_9164","20170421-IMG_9165","20170421-IMG_9168",
                     "20170422-IMG_9172","20170422-IMG_9174","20170422-IMG_9175",
                     "20170422-IMG_9177","20170422-IMG_9181","20170422-IMG_9182","20170422-IMG_9183",
                     "20170422-IMG_9185","20170422-IMG_9186","20170422-IMG_9197","20170422-IMG_9201",
                     "20170422-IMG_9204","20170422-IMG_9206","20170422-IMG_9208","20170422-IMG_9213",
                     "20170422-IMG_9215","20170422-IMG_9217","20170422-IMG_9226","20170422-IMG_9228",
                     "20170422-IMG_9229","20170422-IMG_9232","20170422-IMG_9238","20170422-IMG_9241",
                     "20170422-IMG_9248","20170422-IMG_9249","20170422-IMG_9250"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Restaurant","Free WiFi","Free parking","Mountain views","Room service"] },

  // ---------------- LOWER DIR ----------------
  { id:"dir-kumrat", city:"Lower Dir", name:"Shelton Rezidor Hotel Kumrat Road", area:"Kumrat",
    address:"Dir, Chutiatan Bypass, Kumrat Road",
    phone:"0313-6222213", whatsapp:"", rating:4.2, reviews:429, type:"hotel" },

  { id:"dir-timergara", city:"Lower Dir", name:"Shelton Hotel and Restaurant", area:"Timergara",
    address:"RR8P+FP7, Chakdara Rd, Timergara, 25000",
    phone:"0945-821111", whatsapp:"", rating:4.1, reviews:798, type:"hotel" },

  // ---------------- UPPER DIR ----------------
  // TODO: branch details pending from client
  { id:"upper-dir-tbd", city:"Upper Dir", name:"Shelton Hotel Upper Dir", area:"",
    address:"Details coming soon",
    whatsapp:"", rating:null, reviews:null, type:"hotel", pending:true },

  // ---------------- MARDAN ----------------
  { id:"mardan-house", city:"Mardan", name:"Shelton House Mardan", area:"Maqam Chowk",
    address:"House #04, Street #04, Pohan Colony, Maqam Chowk, Mardan, 23200",
    phone:"0345-8595559", whatsapp:"", rating:4.2, reviews:282, type:"hotel",
    photos:{
      dir:"assets/img/branches/SHELTON/Shelton Mardan",
      hero:"FWD05939.jpg",
      card:"FWD05939.jpg",
      hasThumb:false,
      groups:{
        "exterior" :["FWD05939","FWD05940","FWD05941"],
        "lobby"    :["FWD05942","FWD05943","FWD05944","FWD05945"],
        "room-standard":["FWD05946","FWD05948","FWD05951","FWD05952","FWD05953"],
        "room-deluxe"  :["FWD05954","FWD05956","FWD05957","FWD05958","FWD05959","FWD05960"],
        "bathroom" :["FWD05963","FWD05964","FWD05965"],
        "dining"   :["FWD05966","FWD05967","FWD05969"],
        "other"    :["FWD05970","FWD05973","FWD05974","FWD05976","FWD05977","FWD05979"]
      }
    },
    roomTypes:["Standard","Deluxe"],
    features:["Free WiFi","Room service","Free parking","Laundry"] },

  { id:"mardan-restaurant", city:"Mardan", name:"Shelton Restaurant", area:"Irum Colony",
    address:"Irum Colony, Mardan, 23200",
    phone:"0937-874358", whatsapp:"", rating:3.9, reviews:820, type:"restaurant" },

  // ---------------- BANNU ----------------
  { id:"bannu-house", city:"Bannu", name:"Shelton House Bannu", area:"Bannu Township",
    address:"2M8X+F35, Street 3, opp. B Park Township, Bannu Township",
    phone:"092-8633527", whatsapp:"", rating:4.2, reviews:262, type:"hotel" },

  // ---------------- DERA ISMAIL KHAN ----------------
  { id:"dik-rezidor", city:"Dera Ismail Khan", name:"Shelton Rezidor Hotel Dera Ismail Khan", area:"GPO Chowk",
    address:"GPO Chowk, Main Quaid-E-Azam Rd, Dera Ismail Khan, 29111",
    phone:"0966-718443", whatsapp:"", rating:4.1, reviews:568, type:"hotel" },

  // ---------------- BUNER ----------------
  { id:"buner-restaurant", city:"Buner", name:"Shelton Restaurant Buner", area:"Swari",
    address:"Main Torgat, Pir Baba Rd, Swari, 19290",
    phone:"03333838420", whatsapp:"923333838420", rating:4.1, reviews:28, type:"restaurant" },
];

const CITY_ORDER = ["Islamabad","Rawalpindi","Peshawar","Lahore","Swat","Lower Dir","Upper Dir","Mardan","Bannu","Dera Ismail Khan","Buner"];

function citySummary(){
  const map = {};
  BRANCHES.forEach(b=>{
    if(!map[b.city]) map[b.city] = [];
    map[b.city].push(b);
  });
  return map;
}


const PHOTO_LABELS = {
  "exterior"    :"Exterior",
  "lobby"       :"Lobby & Reception",
  "room-standard":"Standard Rooms",
  "room-deluxe" :"Deluxe Rooms",
  "room-suite"  :"Suites",
  "bathroom"    :"Bathrooms",
  "dining"      :"Restaurant & Dining",
  "hall"        :"Conference Hall",
  "other"       :"Around the Property"
};
const PHOTO_ORDER = ["exterior","lobby","room-standard","room-deluxe","room-suite","bathroom","dining","hall","other"];

function branchById(id){ return BRANCHES.find(b=>b.id===id); }
