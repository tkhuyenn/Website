(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-010d11ff"],{"0a11":function(e,a,o){"use strict";o("6339")},2532:function(e,a,o){"use strict";var d=o("23e7"),n=o("e330"),c=o("5a34"),i=o("1d80"),t=o("577e"),l=o("ab13"),r=n("".indexOf);d({target:"String",proto:!0,forced:!l("includes")},{includes:function(e){return!!~r(t(i(this)),t(c(e)),arguments.length>1?arguments[1]:void 0)}})},"3d76":function(e,a,o){},"46f1":function(e,a,o){"use strict";o("3d76")},5705:function(e,a,o){},"5a34":function(e,a,o){var d=o("da84"),n=o("44e7"),c=d.TypeError;e.exports=function(e){if(n(e))throw c("The method doesn't accept regular expressions");return e}},6339:function(e,a,o){},"682c":function(e,a,o){e.exports=o.p+"037ba500ed08a4af8fe69418a62afb6d.png"},"77de":function(e,a,o){"use strict";o.r(a);var d=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("div",{staticClass:"bc-login"},[o("header-login"),o("div",{staticClass:"form"},[o("el-form",{ref:"form-phone",staticClass:"form-item",attrs:{model:e.form,rules:e.rules}},[o("div",{staticClass:"text-3xl text-semibold text-center mb-2 title-form"},[e._v(e._s(e.$t("verify.phone-title")))]),o("el-form-item",{attrs:{prop:"country"}},[o("div",{staticClass:"be-flex label",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("label.country")))]),o("el-select",{attrs:{filterable:"","reserve-keyword":"",remote:"","remote-method":e.remoteCountry,clearable:""},on:{change:e.handleSelectCountry},model:{value:e.form.country,callback:function(a){e.$set(e.form,"country",a)},expression:"form.country"}},e._l(e.listCountry,(function(e,a){return o("el-option",{key:a,attrs:{label:e.name,value:e.name}})})),1)],1),o("el-form-item",{attrs:{prop:"phone"}},[o("div",{staticClass:"be-flex label",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("label.phone-number")))]),o("el-input",{attrs:{type:"number",placeholder:e.$t("placeholder.phone-number")},model:{value:e.form.phone,callback:function(a){e.$set(e.form,"phone",a)},expression:"form.phone"}},[o("template",{staticStyle:{cursor:"pointer"},slot:"prepend"},[o("span",{staticStyle:{color:"#5b616e"}},[e._v(e._s(e.phoneDefault))])])],2)],1),o("el-button",{staticClass:"btn w-100 is-none-border cursor",class:e.getDisableBtn?"btn--disabled":null,attrs:{loading:e.isLoading},on:{click:e.handleVerify}},[e._v(e._s(e.$t("verify.continue"))+" ")])],1)],1)],1)},n=[],c=o("5530"),i=o("1da1"),t=o("d4ec"),l=o("bee2"),r=o("262e"),s=o("2caf"),m=(o("96cf"),o("b0c0"),o("ac1f"),o("00b4"),o("caad"),o("2532"),o("9ab4")),u=o("e096"),_=o("d60c"),h=o("e90e"),p=o("4bb5"),f=o("94d8"),g=o("08ba"),b=o("1b40"),y=o("66c7"),v=o.n(y),S=o("9380"),C=o.n(S),w=o("8a30"),M=o.n(w),I=Object(g["a"])("auth"),A=Object(p["a"])("beAuth"),O=Object(p["a"])("beBase"),k=function(e){Object(r["a"])(o,e);var a=Object(s["a"])(o);function o(){var e;return Object(t["a"])(this,o),e=a.apply(this,arguments),e.isLoading=!1,e.listCountry=f,e.language="",e.selectLanguage="",e.phoneDefault="+84",e.form={country:"",phone:""},e.optionLanguage=[{id:1,lang:"en"},{id:2,lang:"vi"}],e.rules={country:[{required:!0,message:e.$t("validate.wrong-country"),trigger:"change"}],phone:[{required:!0,message:e.$t("validate.phone-number"),trigger:"blur"}]},e}return Object(l["a"])(o,[{key:"getDisableBtn",get:function(){return!(this.form.country&&this.form.phone)}},{key:"created",value:function(){this.language=window.localStorage.getItem("bc-lang"),this.selectLanguage=this.language;var e=C()(this.listCountry,(function(e){return"VN"===e.code}))[0];this.form.country=e.name}},{key:"handleSelectCountry",value:function(e){this.phoneDefault=C()(this.listCountry,(function(a){return a.name===e}))[0].dial_code}},{key:"handleChangeLanguage",value:function(){var e;null===(e=this.$refs["form-phone"])||void 0===e||e.resetFields()}},{key:"handleVerify",value:function(){var e,a=this;this.getDisableBtn||null===(e=this.$refs["form-phone"])||void 0===e||e.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(o){var d,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:o&&(d=a.$route.query.email,n=Object(c["a"])(Object(c["a"])({},a.form),{},{countryCode:a.phoneDefault,email:d}),I.verifyPhone(n,!0).then((function(e){M()(a.urlSystem["code.phone.verify.require"],a.phoneDefault)?a.$router.push({name:"verify-phone",query:{email:d,reason:"VERIFY-SMS",type:"SMS",country:a.form.country,phone:a.form.phone,countryCode:a.phoneDefault}}):(a.setToken(e),a.setUserInfo(e),a.$router.push({name:"Wallet"}))})).catch((function(e){console.log(e)})));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())}},{key:"getMobileOperatingSystem",value:function(){var e=navigator.userAgent||navigator.vendor;return/windows phone/i.test(e)?"Windows Phone":/android/i.test(e)?"Android":/iPad|iPhone|iPod/.test(e)?"iOS":"unknown"}},{key:"clearCountry",value:function(e){e||(this.listCountry=f)}},{key:"remoteCountry",value:function(e){e?this.listCountry=C()(f,(function(a){return v()(a.code).toUpperCase().includes(e.toUpperCase())||v()(a.name).toUpperCase().includes(e.toUpperCase())})):e||(this.listCountry=f)}}]),o}(b["d"]);Object(m["c"])([A.Mutation("SET_USER_INFO")],k.prototype,"setUserInfo",void 0),Object(m["c"])([O.State("urlSystem")],k.prototype,"urlSystem",void 0),Object(m["c"])([A.Action("setToken")],k.prototype,"setToken",void 0),Object(m["c"])([Object(b["e"])("form.country")],k.prototype,"clearCountry",null),k=Object(m["c"])([Object(b["a"])({components:{VueRecaptcha:u["a"],HeaderLogin:_["a"],Language:h["a"]}})],k);var L=k,B=L,T=(o("dd63"),o("2877")),G=Object(T["a"])(B,d,n,!1,null,"217134d0",null);a["default"]=G.exports},"94d8":function(e){e.exports=JSON.parse('[{"name":"Afghanistan","code":"AF","dial_code":"+93"},{"name":"Åland Islands","code":"AX","dial_code":"+358"},{"name":"Albania","code":"AL","dial_code":"+355"},{"name":"Algeria","code":"DZ","dial_code":"+213"},{"name":"American Samoa","code":"AS","dial_code":"+1684"},{"name":"Andorra","code":"AD","dial_code":"+376"},{"name":"Angola","code":"AO","dial_code":"+244"},{"name":"Anguilla","code":"AI","dial_code":"+1264"},{"name":"Antarctica","code":"AQ","dial_code":"+672"},{"name":"Antigua and Barbuda","code":"AG","dial_code":"+1268"},{"name":"Argentina","code":"AR","dial_code":"+54"},{"name":"Armenia","code":"AM","dial_code":"+374"},{"name":"Aruba","code":"AW","dial_code":"+297"},{"name":"Australia","code":"AU","dial_code":"+61"},{"name":"Austria","code":"AT","dial_code":"+43"},{"name":"Azerbaijan","code":"AZ","dial_code":"+994"},{"name":"Bahamas","code":"BS","dial_code":"+1242"},{"name":"Bahrain","code":"BH","dial_code":"+973"},{"name":"Bangladesh","code":"BD","dial_code":"+880"},{"name":"Barbados","code":"BB","dial_code":"+1246"},{"name":"Belarus","code":"BY","dial_code":"+375"},{"name":"Belgium","code":"BE","dial_code":"+32"},{"name":"Belize","code":"BZ","dial_code":"+501"},{"name":"Benin","code":"BJ","dial_code":"+229"},{"name":"Bermuda","code":"BM","dial_code":"+1441"},{"name":"Bhutan","code":"BT","dial_code":"+975"},{"name":"Bolivia","code":"BO","dial_code":"+591"},{"name":"Bosnia and Herzegovina","code":"BA","dial_code":"+387"},{"name":"Botswana","code":"BW","dial_code":"+267"},{"name":"Bouvet Island","code":"BV","dial_code":"+47"},{"name":"Brasil","code":"BR","dial_code":"+55"},{"name":"British Indian Ocean Territory","code":"IO","dial_code":"+246"},{"name":"Negara Brunei Darussalam","code":"BN","dial_code":"+673"},{"name":"Bulgaria","code":"BG","dial_code":"+359"},{"name":"Burkina Faso","code":"BF","dial_code":"+226"},{"name":"Burundi","code":"BI","dial_code":"+257"},{"name":"Cambodia","code":"KH","dial_code":"+855"},{"name":"Cameroon","code":"CM","dial_code":"+237"},{"name":"Canada","code":"CA","dial_code":"+1"},{"name":"Cabo Verde","code":"CV","dial_code":"+238"},{"name":"Cayman Islands","code":"KY","dial_code":"+1345"},{"name":"Central African Republic","code":"CF","dial_code":"+236"},{"name":"Chad","code":"TD","dial_code":"+235"},{"name":"Chile","code":"CL","dial_code":"+56"},{"name":"China","code":"CN","dial_code":"+86"},{"name":"Christmas Island","code":"CX","dial_code":"+61"},{"name":"Cocos (Keeling) Islands","code":"CC","dial_code":"+61"},{"name":"Colombia","code":"CO","dial_code":"+57"},{"name":"Komori","code":"KM","dial_code":"+269"},{"name":"Congo","code":"CG","dial_code":"+242"},{"name":"Congo, the Democratic Republic of the","code":"CD","dial_code":"+243"},{"name":"Cook Islands","code":"CK","dial_code":"+682"},{"name":"Costa Rica","code":"CR","dial_code":"+506"},{"name":"Cote D\'Ivoire","code":"CI","dial_code":"+225"},{"name":"Croatia","code":"HR","dial_code":"+385"},{"name":"Cuba","code":"CU","dial_code":"+53"},{"name":"Cyprus","code":"CY","dial_code":"+357"},{"name":"Czech Republic","code":"CZ","dial_code":"+420"},{"name":"Denmark","code":"DK","dial_code":"+45"},{"name":"Djibouti","code":"DJ","dial_code":"+253"},{"name":"Dominica","code":"DM","dial_code":"+1767"},{"name":"Dominican Republic","code":"DO","dial_code":"+1"},{"name":"Ecuador","code":"EC","dial_code":"+593"},{"name":"Egypt","code":"EG","dial_code":"+20"},{"name":"El Salvador","code":"SV","dial_code":"+503"},{"name":"Equatorial Guinea","code":"GQ","dial_code":"+240"},{"name":"Eritrea","code":"ER","dial_code":"+291"},{"name":"Estonia","code":"EE","dial_code":"+372"},{"name":"Ethiopia","code":"ET","dial_code":"+251"},{"name":"Falkland Islands (Malvinas)","code":"FK","dial_code":"+500"},{"name":"Faroe Islands","code":"FO","dial_code":"+298"},{"name":"Fiji","code":"FJ","dial_code":"+679"},{"name":"Finland","code":"FI","dial_code":"+358"},{"name":"France","code":"FR","dial_code":"+33"},{"name":"French Guiana","code":"GF","dial_code":"+594"},{"name":"French Polynesia","code":"PF","dial_code":"+689"},{"name":"French Southern Territories","code":"TF","dial_code":"+262"},{"name":"Gabon","code":"GA","dial_code":"+241"},{"name":"Gambia","code":"GM","dial_code":"+220"},{"name":"Georgia","code":"GE","dial_code":"+995"},{"name":"Germany","code":"DE","dial_code":"+49"},{"name":"Ghana","code":"GH","dial_code":"+233"},{"name":"Gibraltar","code":"GI","dial_code":"+350"},{"name":"Greece","code":"GR","dial_code":"+30"},{"name":"Greenland","code":"GL","dial_code":"+299"},{"name":"Grenada","code":"GD","dial_code":"+1473"},{"name":"Guadeloupe","code":"GP","dial_code":"+590"},{"name":"Guam","code":"GU","dial_code":"+1671"},{"name":"Guatemala","code":"GT","dial_code":"+502"},{"name":"Guernsey","code":"GG","dial_code":"+44"},{"name":"Guinea","code":"GN","dial_code":"+224"},{"name":"Guinea-Bissau","code":"GW","dial_code":"+245"},{"name":"Guyana","code":"GY","dial_code":"+592"},{"name":"Haiti","code":"HT","dial_code":"+509"},{"name":"Heard Island and McDonald Islands","code":"HM","dial_code":"+0"},{"name":"Holy See (Vatican City State)","code":"VA","dial_code":"+379"},{"name":"Honduras","code":"HN","dial_code":"+504"},{"name":"Hong Kong","code":"HK","dial_code":"+852"},{"name":"Hungary","code":"HU","dial_code":"+36"},{"name":"Iceland","code":"IS","dial_code":"+354"},{"name":"India","code":"IN","dial_code":"+91"},{"name":"Indonesia","code":"ID","dial_code":"+62"},{"name":"Iran, Islamic Republic of","code":"IR","dial_code":"+98"},{"name":"Iraq","code":"IQ","dial_code":"+964"},{"name":"Ireland","code":"IE","dial_code":"+353"},{"name":"Isle of Man","code":"IM","dial_code":"+44"},{"name":"Israel","code":"IL","dial_code":"+972"},{"name":"Italy","code":"IT","dial_code":"+39"},{"name":"Jamaica","code":"JM","dial_code":"+1876"},{"name":"Japan","code":"JP","dial_code":"+81"},{"name":"Jersey","code":"JE","dial_code":"+44"},{"name":"Jordan","code":"JO","dial_code":"+962"},{"name":"Kazakhstan","code":"KZ","dial_code":"+7"},{"name":"Kenya","code":"KE","dial_code":"+254"},{"name":"Kiribati","code":"KI","dial_code":"+686"},{"name":"North Korea","code":"KP","dial_code":"+850"},{"name":"South Korea","code":"KR","dial_code":"+82"},{"name":"Kosovo","code":"XK","dial_code":"+383"},{"name":"Kuwait","code":"KW","dial_code":"+965"},{"name":"Kyrgyzstan","code":"KG","dial_code":"+996"},{"name":"Lao People\'s Democratic Republic","code":"LA","dial_code":"+856"},{"name":"Latvia","code":"LV","dial_code":"+371"},{"name":"Lebanon","code":"LB","dial_code":"+961"},{"name":"Lesotho","code":"LS","dial_code":"+266"},{"name":"Liberia","code":"LR","dial_code":"+231"},{"name":"Libya","code":"LY","dial_code":"+218"},{"name":"Liechtenstein","code":"LI","dial_code":"+423"},{"name":"Lithuania","code":"LT","dial_code":"+370"},{"name":"Luxembourg","code":"LU","dial_code":"+352"},{"name":"Macao","code":"MO","dial_code":"+853"},{"name":"North Macedonia, Republic of","code":"MK","dial_code":"+389"},{"name":"Madagascar","code":"MG","dial_code":"+261"},{"name":"Malawi","code":"MW","dial_code":"+265"},{"name":"Malaysia","code":"MY","dial_code":"+60"},{"name":"Maldives","code":"MV","dial_code":"+960"},{"name":"Mali","code":"ML","dial_code":"+223"},{"name":"Malta","code":"MT","dial_code":"+356"},{"name":"Marshall Islands","code":"MH","dial_code":"+692"},{"name":"Martinique","code":"MQ","dial_code":"+596"},{"name":"Mauritania","code":"MR","dial_code":"+222"},{"name":"Mauritius","code":"MU","dial_code":"+230"},{"name":"Mayotte","code":"YT","dial_code":"+262"},{"name":"Mexico","code":"MX","dial_code":"+52"},{"name":"Micronesia, Federated States of","code":"FM","dial_code":"+691"},{"name":"Moldova, Republic of","code":"MD","dial_code":"+373"},{"name":"Monaco","code":"MC","dial_code":"+377"},{"name":"Mongolia","code":"MN","dial_code":"+976"},{"name":"Montenegro","code":"ME","dial_code":"+382"},{"name":"Montserrat","code":"MS","dial_code":"+1664"},{"name":"Morocco","code":"MA","dial_code":"+212"},{"name":"Mozambique","code":"MZ","dial_code":"+258"},{"name":"Myanmar","code":"MM","dial_code":"+95"},{"name":"Namibia","code":"NA","dial_code":"+264"},{"name":"Nauru","code":"NR","dial_code":"+674"},{"name":"Nepal","code":"NP","dial_code":"+977"},{"name":"Netherlands","code":"NL","dial_code":"+31"},{"name":"Netherlands Antilles","code":"AN","dial_code":"+599"},{"name":"New Caledonia","code":"NC","dial_code":"+687"},{"name":"New Zealand","code":"NZ","dial_code":"+64"},{"name":"Nicaragua","code":"NI","dial_code":"+505"},{"name":"Niger","code":"NE","dial_code":"+227"},{"name":"Nigeria","code":"NG","dial_code":"+234"},{"name":"Niue","code":"NU","dial_code":"+683"},{"name":"Norfolk Island","code":"NF","dial_code":"+672"},{"name":"Northern Mariana Islands","code":"MP","dial_code":"+1670"},{"name":"Norway","code":"NO","dial_code":"+47"},{"name":"Oman","code":"OM","dial_code":"+968"},{"name":"Pakistan","code":"PK","dial_code":"+92"},{"name":"Palau","code":"PW","dial_code":"+680"},{"name":"Palestine","code":"PS","dial_code":"+970"},{"name":"Panama","code":"PA","dial_code":"+507"},{"name":"Papua New Guinea","code":"PG","dial_code":"+675"},{"name":"Paraguay","code":"PY","dial_code":"+595"},{"name":"Peru","code":"PE","dial_code":"+51"},{"name":"Philippines","code":"PH","dial_code":"+63"},{"name":"Pitcairn","code":"PN","dial_code":"+64"},{"name":"Poland","code":"PL","dial_code":"+48"},{"name":"Portugal","code":"PT","dial_code":"+351"},{"name":"Puerto Rico","code":"PR","dial_code":"+1939"},{"name":"Qatar","code":"QA","dial_code":"+974"},{"name":"Romania","code":"RO","dial_code":"+40"},{"name":"Russia","code":"RU","dial_code":"+7"},{"name":"Rwanda","code":"RW","dial_code":"+250"},{"name":"Reunion","code":"RE","dial_code":"+262"},{"name":"Saint Barthélemy","code":"BL","dial_code":"+590"},{"name":"Saint Helena","code":"SH","dial_code":"+290"},{"name":"Saint Kitts and Nevis","code":"KN","dial_code":"+1869"},{"name":"Saint Lucia","code":"LC","dial_code":"+1758"},{"name":"Saint Martin (French part)","code":"MF","dial_code":"+590"},{"name":"Saint Pierre and Miquelon","code":"PM","dial_code":"+508"},{"name":"Saint Vincent and the Grenadines","code":"VC","dial_code":"+1784"},{"name":"Samoa","code":"WS","dial_code":"+685"},{"name":"San Marino","code":"SM","dial_code":"+378"},{"name":"Sao Tome and Principe","code":"ST","dial_code":"+239"},{"name":"Saudi Arabia","code":"SA","dial_code":"+966"},{"name":"Senegal","code":"SN","dial_code":"+221"},{"name":"Serbia","code":"RS","dial_code":"+381"},{"name":"Seychelles","code":"SC","dial_code":"+248"},{"name":"Sierra Leone","code":"SL","dial_code":"+232"},{"name":"Singapore","code":"SG","dial_code":"+65"},{"name":"Slovakia","code":"SK","dial_code":"+421"},{"name":"Slovenia","code":"SI","dial_code":"+386"},{"name":"Solomon Islands","code":"SB","dial_code":"+677"},{"name":"Somali","code":"SO","dial_code":"+252"},{"name":"South Africa","code":"ZA","dial_code":"+27"},{"name":"South Sudan","code":"SS","dial_code":"+211"},{"name":"South Georgia and the South Sandwich Islands","code":"GS","dial_code":"+500"},{"name":"Spain","code":"ES","dial_code":"+34"},{"name":"Sri Lanka","code":"LK","dial_code":"+94"},{"name":"Sudan","code":"SD","dial_code":"+249"},{"name":"Suriname","code":"SR","dial_code":"+597"},{"name":"Svalbard and Jan Mayen","code":"SJ","dial_code":"+47"},{"name":"Eswatini","code":"SZ","dial_code":"+268"},{"name":"Sweden","code":"SE","dial_code":"+46"},{"name":"Switzerland","code":"CH","dial_code":"+41"},{"name":"Syrian Arab Republic","code":"SY","dial_code":"+963"},{"name":"Taiwan","code":"TW","dial_code":"+886"},{"name":"Tajikistan","code":"TJ","dial_code":"+992"},{"name":"Tanzania, United Republic of","code":"TZ","dial_code":"+255"},{"name":"Thailand","code":"TH","dial_code":"+66"},{"name":"Timor-Leste","code":"TL","dial_code":"+670"},{"name":"Togo","code":"TG","dial_code":"+228"},{"name":"Tokelau","code":"TK","dial_code":"+690"},{"name":"Tonga","code":"TO","dial_code":"+676"},{"name":"Trinidad and Tobago","code":"TT","dial_code":"+1868"},{"name":"Tunisia","code":"TN","dial_code":"+216"},{"name":"Turkey","code":"TR","dial_code":"+90"},{"name":"Turkmenistan","code":"TM","dial_code":"+993"},{"name":"Turks and Caicos Islands","code":"TC","dial_code":"+1649"},{"name":"Tuvalu","code":"TV","dial_code":"+688"},{"name":"Uganda","code":"UG","dial_code":"+256"},{"name":"Ukraine","code":"UA","dial_code":"+380"},{"name":"United Arab Emirates","code":"AE","dial_code":"+971"},{"name":"United Kingdom","code":"GB","dial_code":"+44"},{"name":"United States of America","code":"US","dial_code":"+1"},{"name":"Uruguay","code":"UY","dial_code":"+598"},{"name":"Uzbekistan","code":"UZ","dial_code":"+998"},{"name":"Vanuatu","code":"VU","dial_code":"+678"},{"name":"Venezuela","code":"VE","dial_code":"+58"},{"name":"Vietnam","code":"VN","dial_code":"+84"},{"name":"Virgin Islands, British","code":"VG","dial_code":"+1284"},{"name":"Virgin Islands, U.S.","code":"VI","dial_code":"+1340"},{"name":"Wallis and Futuna","code":"WF","dial_code":"+681"},{"name":"Yemen","code":"YE","dial_code":"+967"},{"name":"Zambia","code":"ZM","dial_code":"+260"},{"name":"Zimbabwe","code":"ZW","dial_code":"+263"}]')},ab13:function(e,a,o){var d=o("b622"),n=d("match");e.exports=function(e){var a=/./;try{"/./"[e](a)}catch(o){try{return a[n]=!1,"/./"[e](a)}catch(d){}}return!1}},caad:function(e,a,o){"use strict";var d=o("23e7"),n=o("4d64").includes,c=o("44d2");d({target:"Array",proto:!0},{includes:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),c("includes")},d60c:function(e,a,o){"use strict";var d=function(){var e=this,a=e.$createElement,d=e._self._c||a;return d("div",{staticClass:"header-login be-flex align-center jc-space-between"},[d("div",{staticClass:"header-login__left be-flex align-center cursor",on:{click:e.redirect}},[d("img",{staticStyle:{color:"#9900cc",display:"inline-flex",width:"40px",height:"40px"},attrs:{src:o("682c")}}),d("span",{staticClass:"title"},[e._v("CÔNG VINH")])]),d("div",{staticClass:"header-login__right be-flex align-center"},[d("div",{staticClass:"item cursor be-flex align-center"},[d("base-icon",{staticStyle:{"padding-right":"5px"},attrs:{icon:"email",size:"20"}}),d("span",[e._v("congvinhclock@gmail.com")])],1)])])},n=[],c=o("d4ec"),i=o("bee2"),t=o("262e"),l=o("2caf"),r=(o("b0c0"),o("9ab4")),s=o("1b40"),m=o("4bb5"),u=Object(m["a"])("beBase"),_=function(e){Object(t["a"])(o,e);var a=Object(l["a"])(o);function o(){return Object(c["a"])(this,o),a.apply(this,arguments)}return Object(i["a"])(o,[{key:"getShowRight",get:function(){return"sign-up"!==this.$route.name}},{key:"redirect",value:function(){this.$router.push({name:"home"})}},{key:"handleClick",value:function(){window.open("".concat(this.urlSystem["system.token.support.url"]))}},{key:"handleCommand",value:function(e){"chplay"===e?window.open("".concat(this.urlSystem["system.token.app.android.download"])):window.open("".concat(this.urlSystem["system.token.app.ios.download"]))}}]),o}(s["d"]);Object(r["c"])([u.State("coinMain")],_.prototype,"coinMain",void 0),Object(r["c"])([u.State("urlSystem")],_.prototype,"urlSystem",void 0),_=Object(r["c"])([s["a"]],_);var h=_,p=h,f=(o("46f1"),o("2877")),g=Object(f["a"])(p,d,n,!1,null,"c651b1b6",null);a["a"]=g.exports},dd63:function(e,a,o){"use strict";o("5705")},e096:function(e,a,o){"use strict";function d(){return d=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var o=arguments[a];for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&(e[d]=o[d])}return e},d.apply(this,arguments)}var n=function(){var e=!1,a=[],o=function(o){if(!e){e=!0;for(var d=0,n=a.length;d<n;d++)a[d](o)}},d=function(o){e?o():a.push(o)},n={resolved:function(){return e},resolve:o,promise:{then:d}};return n},c=Object.prototype.hasOwnProperty;function i(){var e=n();return{notify:function(){e.resolve()},wait:function(){return e.promise},render:function(e,a,o){this.wait().then((function(){o(window.grecaptcha.render(e,a))}))},reset:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(e)})))},execute:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(e)})))},checkRecaptchaLoad:function(){c.call(window,"grecaptcha")&&c.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!e.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var t=i();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=t.notify);var l={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var e=document.createElement("script");e.id=this.recaptchaScriptId,e.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,e.async=!0,e.defer=!0,document.head.appendChild(e)}},mounted:function(){var e=this;t.checkRecaptchaLoad();var a=d({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),o=this.$slots["default"]?this.$el.children[0]:this.$el;t.render(o,a,(function(a){e.$widgetId=a,e.$emit("render",a)}))},methods:{reset:function(){t.reset(this.$widgetId)},execute:function(){t.execute(this.$widgetId)},emitVerify:function(e){this.$emit("verify",e)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(e){return e("div",{},this.$slots["default"])}};a["a"]=l},e90e:function(e,a,o){"use strict";var d=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("div",{staticClass:"text-center mt-2 language"},[o("el-select",{staticClass:"select-language",attrs:{"popper-class":"select-language-dropdown"},on:{change:e.handleChangeLanguage},model:{value:e.selectLanguage,callback:function(a){e.selectLanguage=a},expression:"selectLanguage"}},[o("el-option",{attrs:{label:""+e.$t("login.en"),value:"en"}},[[o("div",{staticClass:"be-flex flag"},[o("base-icon",{staticStyle:{"margin-right":"4px"},attrs:{icon:"flag-usa",size:"14"}}),o("span",{staticClass:"lang"},[e._v(e._s(e.$t("login.en")))])],1)]],2),o("el-option",{attrs:{label:""+e.$t("login.vi"),value:"vi"}},[[o("div",{staticClass:"be-flex flag"},[o("base-icon",{staticStyle:{"margin-right":"4px","margin-left":"-2px"},attrs:{icon:"flag-vn",size:"19"}}),o("span",{staticClass:"lang",staticStyle:{"margin-left":"1px"}},[e._v(e._s(e.$t("login.vi")))])],1)]],2),o("div",{staticClass:"suffix",attrs:{slot:"prefix"},slot:"prefix"},["flag-usa"===e.getIcon?o("base-icon",{staticClass:"flag-usa",attrs:{icon:e.getIcon,size:"14"}}):o("base-icon",{staticClass:"flag-vn",attrs:{icon:e.getIcon,size:"19"}})],1)],1)],1)},n=[],c=o("d4ec"),i=o("bee2"),t=o("262e"),l=o("2caf"),r=o("9ab4"),s=o("1b40"),m=function(e){Object(t["a"])(o,e);var a=Object(l["a"])(o);function o(){var e;return Object(c["a"])(this,o),e=a.apply(this,arguments),e.selectLanguage="",e}return Object(i["a"])(o,[{key:"created",value:function(){this.selectLanguage=window.localStorage.getItem("bc-lang")}},{key:"getIcon",get:function(){return"vi"===this.selectLanguage?"flag-vn":"flag-usa"}},{key:"handleChangeLanguage",value:function(e){this.$i18n.locale=e,window.localStorage.setItem("bc-lang",e),location.reload()}}]),o}(s["d"]);Object(r["c"])([Object(s["c"])({required:!1,type:Boolean,default:!1})],m.prototype,"isReload",void 0),m=Object(r["c"])([s["a"]],m);var u=m,_=u,h=(o("0a11"),o("2877")),p=Object(h["a"])(_,d,n,!1,null,"0850ba00",null);a["a"]=p.exports}}]);