/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.0.0",
   minimumCompatibleVersion: "0.1.7",
   build: "1.0.0.185",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'no_menu',
            type:'image',
            rect:['1125px','210px','315px','475px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"no_menu.png",'0px','0px']
         },
         {
            id:'ground_stage',
            type:'image',
            rect:['0px','0px','1440px','819px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"ground_stage.png",'0px','0px']
         },
         {
            id:'menu_selected',
            type:'image',
            rect:['157px','260px','412px','388px','auto','auto'],
            opacity:0,
            fill:["rgba(0,0,0,0)",im+"menu_selected.png",'0px','0px']
         },
         {
            id:'menu_normal_state',
            type:'image',
            rect:['651px','332px','365px','316px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"menu_normal_state.png",'0px','0px']
         },
         {
            id:'menu_inactive',
            type:'image',
            rect:['651px','332px','365px','316px','auto','auto'],
            opacity:0,
            fill:["rgba(0,0,0,0)",im+"menu_inactive.png",'0px','0px']
         },
         {
            id:'menu_hover_state',
            type:'image',
            rect:['157px','260px','412px','388px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"menu_hover_state.png",'0px','0px']
         },
         {
            id:'timeline',
            type:'image',
            rect:['304px','688px','908px','122px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"timeline.png",'0px','0px']
         },
         {
            id:'sub_resumee',
            type:'image',
            rect:['758px','51px','579px','127px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"sub_resumee.png",'0px','0px']
         },
         {
            id:'willstdu',
            type:'image',
            rect:['874px','185px','348px','31px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"willstdu.png",'0px','0px']
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_timeline}": [
            ["style", "left", '304px'],
            ["style", "top", '688px']
         ],
         "${_sub_resumee}": [
            ["style", "left", '758.21px'],
            ["style", "top", '52.67px']
         ],
         "${_menu_hover_state}": [
            ["style", "top", '260px'],
            ["style", "opacity", '1'],
            ["style", "left", '216.95px']
         ],
         "${_willstdu}": [
            ["style", "top", '185px'],
            ["style", "opacity", '1'],
            ["style", "left", '874px']
         ],
         "${_menu_inactive}": [
            ["style", "top", '332px'],
            ["style", "opacity", '0'],
            ["style", "left", '711.05px']
         ],
         "${_no_menu}": [
            ["style", "left", '1125px'],
            ["style", "top", '209.98px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '1440px'],
            ["style", "height", '819px'],
            ["style", "overflow", 'hidden']
         ],
         "${_menu_selected}": [
            ["style", "top", '260px'],
            ["style", "opacity", '0'],
            ["style", "left", '217.05px']
         ],
         "${_menu_normal_state}": [
            ["style", "top", '331.7px'],
            ["style", "opacity", '1'],
            ["style", "left", '711.19px']
         ],
         "${_ground_stage}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 1000,
         autoPlay: true,
         timeline: [
            { id: "eid26", tween: [ "style", "${_menu_normal_state}", "left", '923px', { fromValue: '711.19px'}], position: 750, duration: 250 },
            { id: "eid37", tween: [ "style", "${_willstdu}", "top", '185px', { fromValue: '185px'}], position: 1000, duration: 0 },
            { id: "eid36", tween: [ "style", "${_sub_resumee}", "top", '97.67px', { fromValue: '52.67px'}], position: 750, duration: 175 },
            { id: "eid9", tween: [ "style", "${_menu_inactive}", "opacity", '1', { fromValue: '0.000000'}], position: 750, duration: 250 },
            { id: "eid25", tween: [ "style", "${_menu_selected}", "left", '388.18px', { fromValue: '217.05px'}], position: 750, duration: 250 },
            { id: "eid27", tween: [ "style", "${_menu_inactive}", "left", '922.82px', { fromValue: '711.05px'}], position: 750, duration: 250 },
            { id: "eid24", tween: [ "style", "${_menu_hover_state}", "left", '388px', { fromValue: '216.95px'}], position: 750, duration: 250 },
            { id: "eid39", tween: [ "style", "${_willstdu}", "opacity", '0', { fromValue: '1'}], position: 750, duration: 75 },
            { id: "eid7", tween: [ "style", "${_menu_selected}", "opacity", '1', { fromValue: '0.000000'}], position: 568, duration: 139 },
            { id: "eid4", tween: [ "style", "${_menu_hover_state}", "opacity", '0', { fromValue: '1'}], position: 925, duration: 75 },
            { id: "eid15", tween: [ "style", "${_no_menu}", "left", '1442px', { fromValue: '1125px'}], position: 750, duration: 250 },
            { id: "eid12", tween: [ "style", "${_menu_normal_state}", "opacity", '0', { fromValue: '1'}], position: 750, duration: 75 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-1492000");
