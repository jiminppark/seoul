;
(function ($, win, doc, undefined) {

    'use strict';

    $plugins.common = {
        init: function () {
            console.log('common.js  ======================================');

            $plugins.uiAjax({
                id: 'baseHeader',
                url: '../../html/inc/header.html',
                page: true,
                callback: $plugins.common.header
            });
            $plugins.uiAjax({
                id: 'sHeader',
                url: '../../html/inc/header_small.html',
                page: true,
                callback: $plugins.common.header
            });
            $plugins.uiAjax({
                id: 'baseFooter',
                url: '../../html/inc/footer.html',
                page: true,
                callback: $plugins.common.footer
            });
            $plugins.uiAjax({
                id: 'sFooter',
                url: '../../html/inc/footer_copy.html',
                page: true,
                callback: $plugins.common.footer
            });

            $.browser.modal ? '' : $plugins.uiSelect();

            
            $plugins.uiFileUpload({ id:'addfile', accept:'image/*'});
            $plugins.uiFileUpload({ id:'addfile2', accept:'image/*'});
            $plugins.uiFileUpload({ id:'addfile3', accept:'image/*'});
            $plugins.uiFileUpload({ id:'addfile4', accept:'image/*'});

            $plugins.page.accordion = function(){
                $plugins.uiAccordion({ id:'faqList', current:null, autoclose:true });
                $plugins.uiAccordion({ id:'guidanceList', current:[0], autoclose:true });
            }


            // datepicker jquery-ui
            $(".inp-date").datepicker({
                showOn: "button",
                dateFormat: "yy-mm-dd",
            });
            $.datepicker.setDefaults({
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //월 이름
                monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showMonthAfterYear: true,
                //numberOfMonths: 2,
                yearSuffix: '.'
            });
            /*
            var dateFormat = "yy-mm-dd",
            from = $( "#from" )
            .datepicker({
                    //defaultDate: "0",
                    //changeMonth: true,
                    numberOfMonths: 1
            })
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
            to = $( "#to" ).datepicker({
                //defaultDate: "+1w",
                //changeMonth: true,
                numberOfMonths: 1
            })
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });
            */

            function getDate( element ) {
                var date;
                try {
                    date = $.datepicker.parseDate( dateFormat, element.value );
                } catch( error ) {
                    date = null;
                }

                return date;
            }

        },

        header: function () {
            console.log('load - header ');

            var $gnb_wrap = $('.gnb-wrap'),
                $dep1_btn = $gnb_wrap.find('.ui-acco-btn'),
                $dep2_wrap = $gnb_wrap.find('.ui-acco-pnl'),
                $dep2_btn = $dep2_wrap.find('a'),
                $gnb_bg = $('.gnb-bg'),
                timer_gnb;

            $dep1_btn.on('mouseover focus', function(){
                clearTimeout(timer_gnb);
                gnbShow();
            }).on('mouseleave blur', function(){
                timer_gnb = setTimeout(function(){
                     gnbHide();
                }, 50);
               
            });
            $dep2_btn.on('mouseover focus', function(){
                clearTimeout(timer_gnb);
                 gnbShow();
            }).on('mouseleave blur', function(){
                timer_gnb = setTimeout(function(){
                     gnbHide();
                }, 50);
            });
            $('.gnb-wrap, .gnb-bg').on('mouseover focus', function(){
                clearTimeout(timer_gnb);
            }).on('mouseleave blur', function(){
                timer_gnb = setTimeout(function(){
                     gnbHide();
                }, 50);
            });

            function gnbShow(){
                clearTimeout(timer_gnb);
                $dep2_wrap.stop().animate({
                    height: 250,
                    padding: '20px 0'
                },200);
                $gnb_bg.stop().animate({
                    height: 254
                },200);
            }
            function gnbHide(){
                $dep2_wrap.stop().animate({
                    height: 0,
                    padding: 0
                },200);
                $gnb_bg.stop().animate({
                    height: 0
                },200);
            }

            //mobile
            $('.btn-allmenu-open').on('click', function(){
                $('.allmenu-wrap').addClass('on').attr('aria-hidden',false);
            });
            $('.btn-allmenu-close').on('click', function(){
                $('.allmenu-wrap').removeClass('on').attr('aria-hidden',true);
            });

            $plugins.uiAccordion({ 
                id:'uiAllMenu', 
                current:null, 
                autoclose:true, 
                callback:function(v){console.log(v)} 
            });
 
        },

        footer: function () {
            console.log('load - footer');
        }
    };

    //modal
    $plugins.modal = {
        alert: function (v) {
            //console.log(v);
        }
    }

    //page 
    $plugins.page = {}

    //callback
    $plugins.callback = {
        modal: function (modalId) {
            switch (modalId) {
                case 'modalID':
                    break;
            }
        }
    }

    $(doc).ready(function () {
        $plugins.common.init();
    });
})(jQuery, window, document);
