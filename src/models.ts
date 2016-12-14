export class Song {
    title: string;
    artist: string;
    album: string;
    albumArtUrl: string;

    constructor(data: any) {
        this.title = data['title'];
        this.artist = data['artist'];
        this.album = data['album'];
        this.albumArtUrl = data['albumArt'];
    }
}

export class Rating {
    liked: boolean;
    disliked: boolean;

    constructor(data: any) {
        this.liked = data['liked'];
        this.disliked = data['disliked'];
    }
}

export class Time {
    current: number;
    total: number;

    constructor(data: any) {
        this.current = data['current'];
        this.total = data['total'];
    }

    get progress(): string {
        return this.getTime(this.current) + ' / ' + this.getTime(this.total);
    }

    private getTime(ms: number): string {
        // `toISOString()` returns YYYY-MM-DDTHH:mm:ss.sssZ
        // slice to only include minutes and seconds
        return new Date(ms).toISOString().slice(14, -5);
    }
}

export class Playback {
    playing: boolean;
    song: Song;
    rating: Rating;
    time: Time;
    songLyrics: string;
    shuffle: string;
    repeat: string;
    volume: string;

    constructor(data: any) {
        this.playing = data['playing'];
        this.song = new Song(data['song']);
        this.rating = new Rating(data['rating']);
        this.time = new Time(data['time']);
        this.songLyrics = data['songLyrics'];
        this.shuffle = data['shuffle'];
        this.repeat = data['repeat'];
        this.volume = data['volume'];
    }

    get currentSong(): string {
        return '♫ ' + this.song.artist + ' - ' + this.song.title + ` (${this.time.progress})`;
    }
}