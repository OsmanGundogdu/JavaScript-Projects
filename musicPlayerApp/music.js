class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
    new Music("Bu da Geçer mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
    new Music("Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3"),
    new Music("16 Bar", "Contra", "4.jpg", "4.mp3"),
    new Music("Afaki", "Contra", "4.jpg", "5.mp3"),
    new Music("Başlangıç", "Contra", "4.jpg", "6.mp3"),
    new Music("Benden Bil", "Contra", "4.jpg", "7.mp3"),
    new Music("Bir Yana", "Contra", "4.jpg", "8.mp3"),
    new Music("Duvar", "Contra", "4.jpg", "9.mp3"),
    new Music("Efsane", "Contra", "4.jpg", "10.mp3"),
    new Music("Hayırlara Ola", "Contra", "4.jpg", "11.mp3"),
    new Music("İstasyon", "Contra", "4.jpg", "12.mp3"),
    new Music("Islak Kum", "Contra", "4.jpg", "13.mp3"),
    new Music("Kan Sahibi", "Contra", "4.jpg", "14.mp3"),
    new Music("Kibir", "Contra", "4.jpg", "15.mp3"),
    new Music("Kıvılcım", "Contra", "4.jpg", "16.mp3"),
    new Music("Mahkum", "Contra", "4.jpg", "17.mp3"),
    new Music("Ölü", "Contra", "4.jpg", "18.mp3"),
]