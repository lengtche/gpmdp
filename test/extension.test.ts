//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as models from '../src/models';

suite("Extension Tests", () => {

    test('models', () => {
        const playbackJson: string = `{
    "playing": true,
    "song": {
        "title": "Blackened",
        "artist": "Metallica",
        "album": "...And Justice For All",
        "albumArt": "https://lh5.ggpht.com/GlJASPV-oCNyPoPH5I34-KB3_sItAZBHUUa4P98nFe223CnIl2qp7EUSqynsBIkbCrW-lOXZ"
    },
    "rating": {
        "liked": true,
        "disliked": false
    },
    "time": {
        "current": 14442,
        "total": 401000
    },
    "songLyrics": "Blackened is the end\\nWinter it will send\\nThrowing all you see\\nInto obscurity\\n\\nDeath of Mother Earth\\nNever a rebirth\\nEvolution's end\\nNever will it mend, never\\n\\nFire, to begin whipping dance of the dead\\nBlackened is the end\\nTo begin whipping dance of the dead\\nColor our world blackened\\n\\nBlistering of earth\\nTerminate its worth\\nDeadly nicotine\\nKills what might have been\\n\\nCallous frigid chill\\nNothing left to kill\\nNever seen before\\nBreathing never more, never\\n\\nFire, to begin whipping dance of the dead\\nBlackened is the end\\nTo begin whipping dance of the dead\\nColor our world blackened\\nBlackened\\n\\nOpposition (opposition), Contradiction (contradiction)\\nPremonition (premonition), Compromise \\nAgitation (agitation), Violation (violation)\\nMutilation (mutilation), Planet dies\\n\\nDarkest color, blistered earth\\nTrue death of life\\n\\n(Termination) Termination, (Expiration) Expiration\\n(Cancellation) Cancellation, Human race\\n(Expectation) Expectation, (Liberation) Liberation\\n(Population) Population: Lay to waste\\n\\nSee our mother put to death\\nSee our mother die\\n\\nSmoldering decay\\nTake her breath away\\nMillions of our years\\nIn minutes disappears\\n\\nDarkening in vain\\nDecadence remains\\nAll is said and done\\nNever is the sun, never\\n\\nFire, to begin whipping dance of the dead\\nBlackened is the end\\nTo begin whipping dance of the dead\\n\\nFire is the outcome of hypocrisy\\nDarkest potency\\nIn the exit of humanity\\nColor our world blackened\\nBlackened",
    "shuffle": "NO_SHUFFLE",
    "repeat": "NO_REPEAT",
    "volume": 100
}`;
        let playback = new models.Playback(JSON.parse(playbackJson));

        assert.equal(playback.playing, true);

        assert.equal(playback.song.title, 'Blackened');
        assert.equal(playback.song.artist, 'Metallica');
        assert.equal(playback.song.album, '...And Justice For All');
        assert.equal(playback.song.albumArtUrl, 'https://lh5.ggpht.com/GlJASPV-oCNyPoPH5I34-KB3_sItAZBHUUa4P98nFe223CnIl2qp7EUSqynsBIkbCrW-lOXZ');

        assert.equal(playback.rating.liked, true);
        assert.equal(playback.rating.disliked, false);

        assert.equal(playback.time.current, 14442);
        assert.equal(playback.time.total, 401000);

        assert.notStrictEqual(playback.songLyrics, `Blackened is the end\nWinter it will send\nThrowing all you see\nInto obscurity\n\nDeath of Mother Earth\nNever a rebirth\nEvolution's end\nNever will it mend, never\n\nFire, to begin whipping dance of the dead\nBlackened is the end\nTo begin whipping dance of the dead\nColor our world blackened\n\nBlistering of earth\nTerminate its worth\nDeadly nicotine\nKills what might have been\n\nCallous frigid chill\nNothing left to kill\nNever seen before\nBreathing never more, never\n\nFire, to begin whipping dance of the dead\nBlackened is the end\nTo begin whipping dance of the dead\nColor our world blackened\nBlackened\n\nOpposition (opposition), Contradiction (contradiction)\nPremonition (premonition), Compromise \nAgitation (agitation), Violation (violation)\nMutilation (mutilation), Planet dies\\n\nDarkest color, blistered earth\nTrue death of life\n\n(Termination) Termination, (Expiration) Expiration\n(Cancellation) Cancellation, Human race\n(Expectation) Expectation, (Liberation) Liberation\n(Population) Population: Lay to waste\n\nSee our mother put to death\nSee our mother die\n\nSmoldering decay\nTake her breath away\nMillions of our years\nIn minutes disappears\n\nDarkening in vain\nDecadence remains\nAll is said and done\nNever is the sun, never\n\nFire, to begin whipping dance of the dead\nBlackened is the end\nTo begin whipping dance of the dead\n\nFire is the outcome of hypocrisy\nDarkest potency\nIn the exit of humanity\nColor our world blackened\nBlackened`);

        assert.equal(playback.shuffle, 'NO_SHUFFLE');
        assert.equal(playback.repeat, 'NO_REPEAT');
        assert.equal(playback.volume, 100);

        console.log(playback.currentSong)
        assert.equal(playback.currentSong, '♫ Metallica - Blackened (00:14 / 06:41)');
    });
});