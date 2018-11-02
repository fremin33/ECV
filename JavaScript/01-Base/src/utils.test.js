import {
    isTweetFr
} from './utils';

// 1 tester  que is tweetfr renvoi vrai pour un twee français
describe('isTweetFr', () => {
    it('Return true si le tweet est français ou canadien', () => {
        expect(isTweetFr({lang: 'fr'})).toBe(true);
        expect(isTweetFr({lang: 'fr_ca'})).toBe(true);

    });
    it('Return false si le tweet est en anglais ', () => {
        expect(isTweetFr({lang: 'us'})).toBe(false);
        expect(isTweetFr({lang: undefined})).toBeFalsy();
        expect(isTweetFr({})).toBeFalsy();
    });
    it('Return false si le tweet est en anglais ', () => {
        expect(isTweetFr({lang: 'us'})).toBe(false);
    });
});
