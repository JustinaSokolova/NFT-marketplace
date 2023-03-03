const captainsMint = {
  descriptionTitle: "Description",
  descriptionDescription:
    "This is our very first collection. In general captains has two use case scenarios:\n1) You can assign it to your current ship and it would became your in game avatar, each captain gives passive and active bonuses to the controlled ship.\n2) You may stake it in order to have a passive income.\nCaptains are also upgradable, every few levels new random trait will be generated.",
  profitability: true,
  profitabilityTitle: "Profitability",
  profitabilityValue: "From 10 to 25 NVY per day by staking, depends on rarity",
  profitabilityDescription:
    "Apart of in-game usage as a ship captain you may stake it (freeze for a while) in order to have a passive income in NVY tokens.\nIncome by rarity: Legendary: 25 NVY per day\nEpic: 17 per day\nRare: 10 per day\nCommon: 4 per day",
  rarityTitle: "Rarity",
  rarityDescription:
    "Rarity determines what pool of visuals, traits and income it would be selected. Rarity is the first value that would be generated after you try to mint a token, and then exact pools of component will be used.",
  rarityItems: [
    {
      titleText: "Legendary",
      titleColor: "#fb872c",
      description:
        "Rarest and coolest, best traits possible, great income. You have 5% change to obtain it.",
    },
    {
      titleText: "Epic",
      titleColor: "#c12dfa",
      description:
        "Very nice visuals and good traits. You have 15% chance to obtain it.",
    },
    {
      titleText: "Rare",
      titleColor: "#66fa2d",
      description:
        "Better than common, solid bonuses to the controlled ship. You have 25% chance to obtain it.",
    },
    {
      titleText: "Common",
      titleColor: "#cad0c7",
      description:
        "Nothing special, restricted traits tree. 55% chance to obtain.",
    },
  ],
  nftPartsTitle: "Visual parts",
  nftPartsDescription:
    "This is a core difference of each token, very first thing that will attract attention. Visual parts are divided by rarity pools, where Legendary may have animations and most impressive look.",
  nftPartsCategories: [
    {
      categoryTitle: "Accessories",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/1932cfb0e29152dedb2252e873aed3ef1c19fadaee4eca3c89ce7e852ee583e2/63aa0c8c/Ap5ZQMoLZ4PJXKAb_-Rq6nyDO-0NRUv26i5ze-W7FqcazeYK8gCdLLXgONj_xh8Zo75XMQTx3RZbVQOVdlK8JA%3D%3D?uid=0&filename=acc_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/5b2fc39a747c0f235ce9cae29f251f2b2328b81367672edace3f34c0a2a0f59a/63aa0c95/sCFaoK_NFLEYm0u5q9i0o3yDO-0NRUv26i5ze-W7FqeOGJyeUfBC_X3bw0KDPZVXeh0Rdy1TkREkA41SADmY6Q%3D%3D?uid=0&filename=acc_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/9b76480262844a21b8d7918a634eefeb96bc242e9ca74ff3c27c4a56f53cf4e6/63aa0c9d/KM40uIhAsyS-fa-gOqpIt3yDO-0NRUv26i5ze-W7FqdXe_DkHP8juxvRoNnI4O0M7rmD9awBtyFYFjeCpYKmYg%3D%3D?uid=0&filename=acc_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/417d04012c925bd8b512a24a28be532b2ea9c4bd01c54accbc10d4b5f2a844be/63aa0ca9/KsQ0wxQhwwpyV-O9SUfLBnyDO-0NRUv26i5ze-W7FqfKUtsmeDO9u-Lk-h9A9Id73j-Am2CTA0UNsZFanM0j0g%3D%3D?uid=0&filename=acc_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/85debe90aab2bb3d08ec6c20ce8a18fc07a1010857a1e0652b9f02620f016119/63aa0cb8/LWBdwWL6HgWKj6vzsV6OO3yDO-0NRUv26i5ze-W7FqeZJnPMFpymireyt4KUsX8geTWa0pfXiK5EgLSP1RomEg%3D%3D?uid=0&filename=acc_5.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
      ],
    },
    {
      categoryTitle: "Backgrounds",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/da3b53016676af55b157b6975644bc2f94393b7fc99b68c2ebca0f1e72fb29d8/63aa14a8/Xb-gLrTKgqal-gLS2jR04ne5GKLMM0ogNxdzFio-E4PM7ZdatN95CkqN0DOymiayp0YMiO9aKwOk_jU3C2HGlQ%3D%3D?uid=0&filename=bg_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/b720522a348a990948d4cfe981f609c07935d6d8613203aefb2d32937f93f459/63aa14b5/wQrOoyjrLDghg1Tc1yjeMxX_-tqcwuPTZTqQNgXlu6M0JidaNmy35vFyg4Xu8JwTBn9V5Fw_6HxPlnpHByPx4A%3D%3D?uid=0&filename=bg_10.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/58e3e693a77892e80bbcf92537452e19896833230dbd6a05e24de59abfc40d0c/63aa1591/TF1FmRXWmvMCb5-Qya6t_BX_-tqcwuPTZTqQNgXlu6M5LLbLOXWTyi6ANGHpsnQ8_g21GQ0Z-hHK2KXW2ThO9g%3D%3D?uid=0&filename=bg_11.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/aecb9615deb397cfb109cf0a0c5fa23ec0315c638f3feaf7b3ebaadacf114eea/63aa15c8/3-4GMSyOlY3s5yboREN0Jne5GKLMM0ogNxdzFio-E4N0aTgCEZzuMskXdYgGDyqWdoshYjqfsR_i6ItIFeDbuQ%3D%3D?uid=0&filename=bg_12.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/c525e3d8a1fd8fbaac6b56291b60b856f1cb2eb41b3a37db6dbc18068d5cee44/63aa15dc/m6oqxhNUyAhYt9s3CUNm13e5GKLMM0ogNxdzFio-E4MTELILLxtDLM2z8tCO4-aJHNRD8tzkFllEY_zFN3_CpQ%3D%3D?uid=0&filename=bg_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/abe7e04a1073106f19c4226b085c73346cc71ede55661112dfe960969d499ced/63aa15ee/dfk4w9jP7ufwgn6MHXgO8BX_-tqcwuPTZTqQNgXlu6MCfOAWBQ_fBNHSAY_qO1btMQmn1eBJvgSV8QybxoqQoA%3D%3D?uid=0&filename=bg_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/800e0a8f798fa840d8be959e670420274f8448d8c57b363007cb33390672bf1a/63aa15f7/arC0NEzBPAEkPyBy7CnPMRX_-tqcwuPTZTqQNgXlu6MmVNIp7mIIq1sYnmMJXlZi0395uqKN4RUQlmbcRqSdfw%3D%3D?uid=0&filename=bg_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/25877acd8bc3982b10a38c21513e76ce2b06be62a301d2dab9add37da5f63983/63aa1608/g5EF9b8ptvD8Lp4TxdD2Nne5GKLMM0ogNxdzFio-E4OCAySdDAAmZMgMtGblIubj-i2ze1W766voYEclOyA4mg%3D%3D?uid=0&filename=bg_5.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/3285e363190eeeb5a8db32b5b2f5cd480b907355d0d0213f75ef55c7e09aa263/63aa1620/jAtdKpIVDIrKZva_NKJT-BX_-tqcwuPTZTqQNgXlu6Ptl4QGh6IH52591bvu1MY3BwSLhcModSRVgJsSYO8K6w%3D%3D?uid=0&filename=bg_6.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/4b75364f4f8fc67466dcae6e39e26cdd04a4c637d7e43a20e81521165f616f8a/63aa162a/WskSM33rjL_FNBiseG-apBX_-tqcwuPTZTqQNgXlu6N0L8Kj_cqYFsO95i42jnkE9odAz0LIbnNG3YArnmG90w%3D%3D?uid=0&filename=bg_7.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/25ac0790be0401bc78532355c2e366aec6987606d556660a8a34964745dd0a63/63aa1639/arC0NEzBPAEkPyBy7CnPMRX_-tqcwuPTZTqQNgXlu6MmVNIp7mIIq1sYnmMJXlZi0395uqKN4RUQlmbcRqSdfw%3D%3D?uid=0&filename=bg_8.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/906384cb9e7921fbdc3c7cef5cfec9764b1e13a877f3d9011f32bab9ce3b3618/63aa1643/JBEbHb-3mfJfn6rssH1B1BX_-tqcwuPTZTqQNgXlu6O7kxj7uzQ0kRop9I01oCoGAHelOi6egrhVtatboIAggw%3D%3D?uid=0&filename=bg_9.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
      ],
    },
    {
      categoryTitle: "Clothes",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/5db816bd0e7a070ee23b231d0150573ace6bfe67607319465919e7d90b384b2f/63aa1ac6/iYhtlyP_4AyHtf0zTxGAhABAWIYZoZwc1Lz7n7bMTMawCgmo7WagRPx-mwrTtXAsp_GRRhpZ2I1aFFWfBoJNbQ%3D%3D?uid=0&filename=clothes_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/e8006c1a9f87b25e6280f3786a377e0e37e2dfbf8d92d9de3708c46cf797dba3/63aa1c96/_zlchG9v2vm8Je56wNL9OgBAWIYZoZwc1Lz7n7bMTMaV2C8MDi5nZyFcSsjeHdhhVqaL8__WbAeAXhJH5imMVg%3D%3D?uid=0&filename=clothes_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/a5d0525b99b77c0965c0d7ed580fcf7f3875085aaadcc8b2463475fcad473c27/63aa1f49/dZTWQbvJVlHfxR0mlrYq2QBAWIYZoZwc1Lz7n7bMTMaPrvdC-9zuwZgmhI0H8mH5U1HAqZ0YO2LUkS_xAF7-jw%3D%3D?uid=0&filename=clothes_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/3b255358dfd5904c34a9a3ea472d700efc7d98701474c4588d0f96405fcf336d/63aa1f5a/XO4Vwh2tBq_rT4budDSNugBAWIYZoZwc1Lz7n7bMTMbVnwEmuhoEdvqstdC3r1J5jCar7ghs9e7sC5mvyZgfaA%3D%3D?uid=0&filename=clothes_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/25273a4d57f57509d0257dd4daeb710926ee985c442bc1699b685c9d3061ee69/63aa1f65/MeqInbmjyjXmduX2i3CymwBAWIYZoZwc1Lz7n7bMTMbocZx3WKcve0uPbT0CQgQlRlCOsgB_2bLPE0lgPicxHw%3D%3D?uid=0&filename=clothes_5.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/8002bd66d28c2ab4051decffd43462e628a31d7cb4da30fdf2081753c94fa2b1/63aa1f70/4HYT95Md6bhRcBuFfymfMQBAWIYZoZwc1Lz7n7bMTMbA-dCHEI6mklIh-hntF6nxnHTZaIzpoqU1JkB6qlMSkg%3D%3D?uid=0&filename=clothes_6.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 20,
          rarity: "Epic",
        },
      ],
    },
    {
      categoryTitle: "Haircuts",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/c92e735826fcaf3f332348253b458dd36b86cf00cae14949ab913821b12c2bbf/63aa202a/yCYDOmu7WqEe8J74wlL2kTF88hmh9FIwxCwekBSUwWesOkaedbLPNhnUnEkXavYnTaZwDGgs9Ldh3Wzq4RWNGA%3D%3D?uid=0&filename=haircut_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/7170fe3ea4e0a062ce51d2af2e12ea1e794cf3837aa706e30d9a669111f484a1/63aa2038/8uorUVwIliiX9jcDRT6BEDF88hmh9FIwxCwekBSUwWdtmRSjTYlMe9nEpRCyYsTn2bkKkrwk30oC-XAK-BD54w%3D%3D?uid=0&filename=haircut_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/108422d1f1fad13f742decbcd50b8fd3041ea856e6aed111bb1ae29ab7eab0b0/63aa2041/xF-EcjV8e-fQGPW1Y0RtFTF88hmh9FIwxCwekBSUwWdajucT24VhR5iI4B_SdvyFxW_6ApmOw7VmLwdpd5emOg%3D%3D?uid=0&filename=haircut_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/48268030d5d8ed3ae258b7378e16f3699cba79a6e9d2c470674668a10a7916e6/63aa2048/QAKR3yNw94Rn-IU1v7ejnzF88hmh9FIwxCwekBSUwWc73C3m_OKd4R56GKx7THmK4vUg8kKDCAaD_pMdTf3Uhw%3D%3D?uid=0&filename=haircut_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
      ],
    },
    {
      categoryTitle: "Hats",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/7bc0f51fe957170a44232c0ca1d0f4f4484bd359a54d3303f698b0ee685c09ee/63aa20d6/SXFXeH6xJ0pDLZmYw7uusm0dfY72qcf7P8dLhH884EZ4k4hpQA8QwgkHxMRBbhL6SYlZCfZu77rqRRivfB7x8w%3D%3D?uid=0&filename=hat_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/7bc0f51fe957170a44232c0ca1d0f4f4484bd359a54d3303f698b0ee685c09ee/63aa20d6/SXFXeH6xJ0pDLZmYw7uusm0dfY72qcf7P8dLhH884EZ4k4hpQA8QwgkHxMRBbhL6SYlZCfZu77rqRRivfB7x8w%3D%3D?uid=0&filename=hat_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/cf5bddffb68105027d12e9013743430320487d692ee17a18d6d1292956799013/63aa20f0/IUJ6it0nJB48Du3RfoOk15nFo3Ey4_F8ktKiJUOmu_kc8X1V6NOWb5BBE9buDLSKY-vAPRorSCFE-sUUNFr7TQ%3D%3D?uid=0&filename=hat_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/7108cb1f0f500509516bde643baee2f70f02d2c908add033b163ec2f8f942922/63aa2109/8V8wb-fWFA6VmMyc3j_XSZnFo3Ey4_F8ktKiJUOmu_l62LuxRzuTj_TPtrGU9SRup1Bp8tV1H3GlMvYWv8aMXw%3D%3D?uid=0&filename=hat_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/fd8f6f6b08a537fc6ec9577fbea38d9b27ecf935a159c03113be7bba5dcf4d86/63aa2113/nsQpRq2IHIBd3OArXZ9HQ5nFo3Ey4_F8ktKiJUOmu_lqq3KMgKzFhQDr_NZ10CoSm2IbJbXcSEL_fYuuIo04Iw%3D%3D?uid=0&filename=hat_5.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 33,
          rarity: "Common",
        },
      ],
    },
    {
      categoryTitle: "Heads",
      categoryItems: [
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/3951154a03ad16b00bc8a15cf867dafbf73936913eaff762324d45200c4daedb/63aa2186/Mde3pX0vzpvo9JKS0pTsxPhUv2EUmnF8B4CbNeXeUQ8bZ9efoBe5r-NZlSB1WxmaIgg3_1YxPtYLpXcm_rqVFA%3D%3D?uid=0&filename=head_1.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 25,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/1bdc08f2f25fb02dea832023ba7325f45b9ab8e553578e74fc6d3b5123cab5b6/63aa2193/QD4WNKAN29wFXhrHbvEy_4gPcKMjchvT7W-YktDAX4vlzUkJ1JkDhW139XbdUOlva9UkE2B8Ob1jn42xUnh8dA%3D%3D?uid=0&filename=head_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 25,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/1d42038ae11be882280da2f25ea456fe845bb34f49225222793b9118665871de/63aa219b/t9ETNFp_yBZn5IafN8FnmvhUv2EUmnF8B4CbNeXeUQ_28WwM9yNhiiaVrgA6TROC_wxyhQ0aiHcFR8qoHnhCMw%3D%3D?uid=0&filename=head_3.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 25,
          rarity: "Common",
        },
        {
          imageUrl:
            "https://downloader.disk.yandex.ru/preview/2558b9f63b89a6880746b55bc59a0d7bb678240bab16c6acc807fe114e02f198/63aa21a4/cl8slIqwhSnrUtW9m_aDY_hUv2EUmnF8B4CbNeXeUQ8bD3p_o7A3wAMZ8bV2j1YICM2RI8t3XE9qvUlBPzF3pA%3D%3D?uid=0&filename=head_4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
          chancePercent: 25,
          rarity: "Common",
        },
      ],
    },
  ],
  collectionSize: 500,
  collectionImagesPreview: [
    "https://downloader.disk.yandex.ru/preview/d02466e218a160f9801d7804751e36ba9ac9250726a8705eeb8a6fd578fb3248/63a9fb1a/3wy2wv2x2tigxgCQEkzh8VurSvAwkZzRMTNlVOJBHS36bZxmsiasJUEpkrGUZW6sNascgRV4NKsHj_8JB1iMFQ%3D%3D?uid=0&filename=0.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
    "https://downloader.disk.yandex.ru/preview/f463ee8aae8a7353bc4119bc7541f946fa3e4401a93031bc5e9386c3860aa014/63a9fb3c/QyJVZZbwRIeyr9XP2A16FD9HCkJqWwDt5QyWy6uY303CFr1_x70ccIzz0Pn2KGahX2Bd1AXrz_oi-y3HPvb0iA%3D%3D?uid=0&filename=20.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
    "https://downloader.disk.yandex.ru/preview/8bc1b7ae522754ae8611bf520f36358d6c7c7942d1422163f4a9038c89d4f21a/63a9fb4a/sCjGwSYycWQHQs0n3CpgP7_40FwQMVSPtQiANcUooRfv3bAIhSHrSEt0_wGIzT92MoCjy1c7PGH6z_ViFOqKgA%3D%3D?uid=0&filename=45.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
    "https://downloader.disk.yandex.ru/preview/ad9cd2d6bb8ee60cbcf837446fd40c158c33e77f5c27b37850009c536859de91/63a9fb55/QRZHYfHPz19RQttKqauV2z-l8Y7Pws7y8BvEreptvmHmcO_-Bh5HC72NEE5XRb3T5xogwTHI3TD-Wl_gSKWIcw%3D%3D?uid=0&filename=51.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
    "https://downloader.disk.yandex.ru/preview/a4166af864c08cf8af3453ed0b4456fa9dfd3392b47711bb06e7057014a7780f/63a9fb5d/eE1k74LW6Y6b_svplARhg9IG93txb2qbK_xtZS0S2i1WUJwjXmWfbWXxQPZldsPOfENfjg0G4fF8iqzRnuIv9w%3D%3D?uid=0&filename=82.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
  ],
  mintingEnabled: false,
  mintingStartTime: "14/03/2023",
  mintingPriceCoin: 10,
  mintingPriceUSD: 5,
};

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(captainsMint);
    }, 1000);
  });

export default {
  fetchAll,
};
