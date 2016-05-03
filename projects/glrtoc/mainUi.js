/**
 * Created by gavorhes on 12/7/2015.
 */

import {} from '../../src/jquery-plugin/mediaControl';
import {} from '../../src/jquery-plugin/rangeChange';
import appConfig from './appConfig';
import $ from '../../src/jquery';
require('jquery-ui/tabs');
require('jquery-ui/accordion');


/**
 * Set up the UI
 */
export function uiInit() {
    "use strict";

    //$("#operations").accordion('refresh');


    let $sidebar = $('#sidebar');
    let $hideSideBar = $('#hide-sidebar');
    let $showSideBar = $('#show-sidebar');

    let $tabs = $("#tabs");

    let sidebarWidth = $sidebar.width();

    //apply tab layout
    $tabs.tabs({
        heightStyle: "fill",
        activate: function (event, ui) {
            appConfig.currentTabId = ui.newPanel[0].id;
        }
    });

    //apply accordion
    appConfig.$opsAccordion.accordion({
        heightStyle: "fill",
        activate: function (event, ui) {
            appConfig.currentOperationsPanelId = ui.newPanel[0].id;
        }
    });

    $(window).resize(function () {
        $tabs.tabs('refresh');
        setTimeout(function () {
            appConfig.$opsAccordion.accordion("refresh");
        }, 50);
    });

    $hideSideBar.click(function () {
        var mapCenter = appConfig.map.getView().getCenter();

        appConfig.map.beforeRender(function () {
            $sidebar.animate({'margin-left': -1 * sidebarWidth}, 200,
                function () {
                    $hideSideBar.hide();
                    $showSideBar.show();
                    appConfig.map.updateSize();
                }
            );
        });
        appConfig.map.getView().setCenter(mapCenter);
    });

    $showSideBar.click(function () {
        var mapCenter = appConfig.map.getView().getCenter();

        appConfig.map.beforeRender(function () {
            $sidebar.animate({'margin-left': 0}, 200,
                function () {
                    $showSideBar.hide();
                    $hideSideBar.show();
                    appConfig.map.updateSize();
                }
            );
        });
        appConfig.map.getView().setCenter(mapCenter);
    });

    let d = new Date();
    let endTime = d.getTime();
    d.setHours(d.getHours() - 4);
    let startTime = d.getTime();
    let rangeStep = Math.round((endTime - startTime) / 8);

    appConfig.mediaControl = $('#animation-control').mediaControl(startTime, endTime, endTime, rangeStep,
        function (t) {
            for (let l of appConfig.animationLayers) {
                l.setLayerTime(t);
            }
        },
        750, true);
}


//http://realearth.ssec.wisc.edu/api/image?products=nexrhres_20160108_180000&x=5&y=5&z=4

export function uiAfterMap() {
    "use strict";


}