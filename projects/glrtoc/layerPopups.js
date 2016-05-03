/**
 * Created by gavorhes on 12/7/2015.
 */


/**
 * coordination layer popup config
 * @param {object} props
 * @returns {string}
 */
export function coordination(props) {
    "use strict";
    return `<iframe src="${window.location.href.replace('#', '') +
    '/../toc?toc=' + props['toc']}" width="368" height="292"></iframe>`;
}

/**
 * wrs layer popup config
 * @param {object} props
 * @returns {string}
 */
export function wrs(props) {
    "use strict";
    return `<p style="text-align: center">${props['WMS_INFO'].replace(/\n/g, '<br>')}</p>`
}

export function specialEventWorkZone(props) {
    "use strict";
    let startDate = new Date(props['EventStartDate']);
    let endDate = new Date(props['EventEndDate']);
    let theContent = '<p style="text-align:center">';
    theContent += props['EventDescription'] + '<br>';
    theContent += `${props['HwyName']} ${props['Location']}` + '<br>';
    theContent += `${startDate.toLocaleDateString()}&nbsp;-&nbsp;${endDate.toLocaleDateString()}`;
    theContent += '</p>';
    return theContent;
}
