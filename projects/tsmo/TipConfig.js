/**
 * Created by gavorhes on 12/14/2015.
 */

/**
 * Tip config object
 */
class TipConfig {
    constructor() {

        /**
         *
         * @type {Sliders}
         */
        this.sliders = undefined;

        /**
         *
         * @type {ol.Map|undefined}
         */
        this.map = undefined;

        this.$loadingGif = null;
        this.$regionSelector = undefined;

        /**
         *
         * @type {TipSegmentLayer}
         */
        this.tipSegmentLayer = undefined;


        /**
         *
         * @type {LayerBase|*}
         */
        this.metamanagerSegments = undefined;
        this.tipSegmentLayerMinZoom = 10;

        /**
         * its layer collection
         * @type {ItsLayerCollection}
         */
        this.itsLayerCollection = undefined;

        /**
         * param list to set up the sliders, initial weight and drop down selection added later
         */
        this._sliderParamArray = [
            ['AADT', [['aadtyr_1', '1']]],
            ['AADT Future', [['aadtyr_5', '5'], ['aadtyr_10', '10'], ['aadtyr_15', '15'], ['aadtyr_20', '20']]],
            ['Growth', [['growth_5', '5'], ['growth_10', '10'], ['growth_15', '15'], ['growth_20', '20']]],
            ['Truck', [['trkdyr_1', '1'], ['trkdyr_20', '20']]],
            ['LOS', [['losyr_1', '1']]],
            ['LOS Future', [['losyr_5', '5'], ['losyr_10', '10'], ['losyr_15', '15'], ['losyr_20', '20']]],
            ['Crash Rate', [['crash_rate', '1']]],
            ['Severity', [['crash_severity', '1']]],
            ['Weather', [['weather', '1']]],
            ['Event', [['event', '1']]]
        ];

        /**
         * Presets list, order of the parameters is important, must match that of the slider param list
         */
        this._presetArray =
            [
                ['Default TIP', [
                    [10.0, 'aadtyr_1'],
                    [7.0, 'aadtyr_20'],
                    [7.0, 'growth_20'],
                    [4.0, 'trkdyr_1'],
                    [12.0, 'losyr_1'],
                    [12.0, 'losyr_20'],
                    [15.0, 'crash_rate'],
                    [13.0, 'crash_severity'],
                    [9.0, 'weather'],
                    [11.0, 'event']]
                ],
                ['Safety', [
                    [20.0, 'aadtyr_1'],
                    [0.0, 'aadtyr_20'],
                    [0.0, 'growth_20'],
                    [0.0, 'trkdyr_1'],
                    [0.0, 'losyr_1'],
                    [0.0, 'losyr_20'],
                    [40.0, 'crash_rate'],
                    [40.0, 'crash_severity'],
                    [0.0, 'weather'],
                    [0.0, 'event']]
                ],
                ['Mobility Present', [
                    [25.0, 'aadtyr_1'],
                    [25.0, 'aadtyr_5'],
                    [0.0, 'growth_20'],
                    [25.0, 'trkdyr_1'],
                    [25.0, 'losyr_1'],
                    [0.0, 'losyr_20'],
                    [0.0, 'crash_rate'],
                    [0.0, 'crash_severity'],
                    [0.0, 'weather'],
                    [0.0, 'event']]
                ],
                ['Mobility Future', [
                    [0.0, 'aadtyr_1'],
                    [25.0, 'aadtyr_20'],
                    [25.0, 'growth_20'],
                    [25.0, 'trkdyr_20'],
                    [0.0, 'losyr_1'],
                    [25.0, 'losyr_20'],
                    [0.0, 'crash_rate'],
                    [0.0, 'crash_severity'],
                    [0.0, 'weather'],
                    [0.0, 'event']]
                ],
                ['Service', [
                    [30.0, 'aadtyr_1'],
                    [0.0, 'aadtyr_20'],
                    [10.0, 'growth_20'],
                    [0.0, 'trkdyr_1'],
                    [30.0, 'losyr_1'],
                    [30.0, 'losyr_20'],
                    [0.0, 'crash_rate'],
                    [0.0, 'crash_severity'],
                    [0.0, 'weather'],
                    [0.0, 'event']]
                ],
                ['Freight Performance', [
                    [20.0, 'aadtyr_1'],
                    [0.0, 'aadtyr_20'],
                    [0.0, 'growth_20'],
                    [60.0, 'trkdyr_1'],
                    [20.0, 'losyr_1'],
                    [0.0, 'losyr_20'],
                    [0.0, 'crash_rate'],
                    [0.0, 'crash_severity'],
                    [0.0, 'weather'],
                    [0.0, 'event']]
                ]
            ];

        for (var i = 0; i < this._sliderParamArray.length; i++) {
            this._sliderParamArray[i].push(this._presetArray[0][1][i][0]);
            this._sliderParamArray[i].push(this._presetArray[0][1][i][1]);
        }

    }
}

export default new TipConfig();
