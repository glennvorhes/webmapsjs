/**
 * Created by glenn on 3/15/2017.
 */


import {keyValPairs} from '../../../src/util/objectHelpers';

let g = {a: 10, b: 11, c: 12};


describe("keyValPairs", function () {

    it('should iterate over the key values of an object', function () {

        let f = keyValPairs(g);


        for (let kv of keyValPairs(g)){
            expect(typeof kv.key).toBe('string');
            expect(typeof kv.value).toBe('number');
        }

    })

});