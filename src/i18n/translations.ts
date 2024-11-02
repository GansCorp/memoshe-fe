export const translations = {
  id: {
    // Header
    home: "Beranda",
    flashcards: "Flashcards",
    study: "Belajar",
    about: "Tentang",
    login: "Masuk",

    // Study Mode
    studyMode: "Mode Belajar",
    orderedMode: "Mode Study",
    shuffleMode: "Mode Shuffle",
    orderedDescription: "Pelajari kartu secara berurutan sesuai dengan bab dan subbab yang tersedia.",
    shuffleDescription: "Pelajari kartu secara acak dengan pilihan kategori yang berbeda.",
    startStudy: "Mulai Belajar",
    startShuffle: "Mulai Shuffle",

    // Chapter Management
    chapterTitle: "Judul Bab",
    enterChapterTitle: "Masukkan judul bab",
    addChapter: "Tambah Bab",
    editChapter: "Edit Bab",
    deleteChapter: "Hapus Bab",
    subchapterTitle: "Judul Sub-bab",
    enterSubchapterTitle: "Masukkan judul sub-bab",
    addSubchapter: "Tambah Sub-bab",
    editSubchapter: "Edit Sub-bab",
    deleteSubchapter: "Hapus Sub-bab",
    allCards: "Semua Kartu",

    // Flashcard Management
    showAnswer: "Tampilkan Jawaban",
    uploadImage: "Upload Gambar",
    playAudio: "Putar Audio",
    addValue: "Tambah Nilai",
    saveFlashcard: "Simpan Flashcard",
    delete: "Hapus",

    // Categories
    selectCategory: "Pilih Kategori",
    allCategories: "Semua Kartu",

    // Alerts
    chapterExists: "Nama bab sudah digunakan. Silakan gunakan nama lain.",
    subchapterExists: "Nama sub-bab sudah digunakan dalam bab ini. Silakan gunakan nama lain.",
    selectChapterFirst: "Silakan pilih bab terlebih dahulu",
    keyExists: "Key sudah digunakan dalam bab/sub-bab ini. Silakan gunakan key lain.",
    confirmDeleteChapter: "Yakin ingin menghapus bab ini? Semua flashcard dalam bab ini akan ikut terhapus.",
    confirmDeleteSubchapter: "Yakin ingin menghapus sub-bab ini? Semua flashcard dalam sub-bab ini akan ikut terhapus.",
    invalidZipFormat: "Format ZIP tidak valid. Pastikan file berisi chapters.json dan flashcards.json",
    errorReadingZip: "Error membaca file ZIP",

    // Zip Management
    uploadZip: "Upload ZIP",
    downloadZip: "Download ZIP",

    // Input placeholders
    enterKey: "Masukkan key",
    enterValue: "Masukkan nilai",
    enterAudioUrl: "Masukkan URL audio",

    // Flashcard types
    text: "Teks",
    picture: "Gambar",
    audio: "Audio",

    // Flashcard actions
    flipCard: "Balik kartu",
    preview: "Pratinjau",

    // Validation messages
    pleaseEnterKey: "Mohon masukkan key",
    pleaseAddValue: "Mohon tambahkan minimal satu nilai",
    pleaseFillValues: "Mohon isi semua nilai",
    errorUploadingImage: "Error mengunggah gambar",

    // Flashcard input labels
    key: "Kunci",
    value: "Nilai",
    audioUrl: "URL Audio",
    
    // Confirmation messages
    confirmDelete: "Yakin ingin menghapus?",

    // Welcome messages
    welcomeTitle: "Selamat datang di MEMOSHE",
    welcomeSubtitle: "Platform belajar dengan flashcard interaktif",
    getStarted: "Mulai Belajar",
    
    // Common texts
    loading: "Memuat...",
    noCards: "Belum ada kartu",
    noChapters: "Belum ada bab",
    
    // Footer
    footerText: "© 2024 MEMOSHE. Semua hak dilindungi.",
    
    // Error messages
    errorLoading: "Terjadi kesalahan saat memuat data",
    tryAgain: "Coba lagi",
  },
  en: {
    // Header
    home: "Home",
    flashcards: "Flashcards",
    study: "Study",
    about: "About",
    login: "Login",

    // Study Mode
    studyMode: "Study Mode",
    orderedMode: "Study Mode",
    shuffleMode: "Shuffle Mode",
    orderedDescription: "Learn cards sequentially according to chapters and subchapters.",
    shuffleDescription: "Learn cards randomly with different category options.",
    startStudy: "Start Study",
    startShuffle: "Start Shuffle",

    // Chapter Management
    chapterTitle: "Chapter Title",
    enterChapterTitle: "Enter chapter title",
    addChapter: "Add Chapter",
    editChapter: "Edit Chapter",
    deleteChapter: "Delete Chapter",
    subchapterTitle: "Subchapter Title",
    enterSubchapterTitle: "Enter subchapter title",
    addSubchapter: "Add Subchapter",
    editSubchapter: "Edit Subchapter",
    deleteSubchapter: "Delete Subchapter",
    allCards: "All Cards",

    // Flashcard Management
    showAnswer: "Show Answer",
    uploadImage: "Upload Image",
    playAudio: "Play Audio",
    addValue: "Add Value",
    saveFlashcard: "Save Flashcard",
    delete: "Delete",

    // Categories
    selectCategory: "Select Category",
    allCategories: "All Cards",

    // Alerts
    chapterExists: "Chapter name already exists. Please use a different name.",
    subchapterExists: "Subchapter name already exists in this chapter. Please use a different name.",
    selectChapterFirst: "Please select a chapter first",
    keyExists: "Key already exists in this chapter/subchapter. Please use a different key.",
    confirmDeleteChapter: "Are you sure you want to delete this chapter? All flashcards in this chapter will be deleted.",
    confirmDeleteSubchapter: "Are you sure you want to delete this subchapter? All flashcards in this subchapter will be deleted.",
    invalidZipFormat: "Invalid ZIP format. Make sure the file contains chapters.json and flashcards.json",
    errorReadingZip: "Error reading ZIP file",
    errorUploadingImage: "Error uploading image",

    // Zip Management
    uploadZip: "Upload ZIP",
    downloadZip: "Download ZIP",

    // Input placeholders & labels
    enterKey: "Enter key",
    enterValue: "Enter value",
    enterAudioUrl: "Enter audio URL",
    key: "Key",
    value: "Value",
    audioUrl: "Audio URL",

    // Flashcard types
    text: "Text",
    picture: "Picture",
    audio: "Audio",

    // Flashcard actions
    flipCard: "Flip card",
    preview: "Preview",

    // Validation messages
    pleaseEnterKey: "Please enter a key",
    pleaseAddValue: "Please add at least one value",
    pleaseFillValues: "Please fill in all values",
    confirmDelete: "Are you sure you want to delete?",

    // Welcome messages
    welcomeTitle: "Welcome to MEMOSHE",
    welcomeSubtitle: "Interactive flashcard learning platform",
    getStarted: "Get Started",
    
    // Common texts
    loading: "Loading...",
    noCards: "No cards yet",
    noChapters: "No chapters yet",
    
    // Footer
    footerText: "© 2024 MEMOSHE. All rights reserved.",
    
    // Error messages
    errorLoading: "Error loading data",
    tryAgain: "Try again",
  },
  ja: {
    // Header
    home: "ホーム",
    flashcards: "フラッシュカード",
    study: "学習",
    about: "概要",
    login: "ログイン",

    // Study Mode
    studyMode: "学習モード",
    orderedMode: "学習モード",
    shuffleMode: "シャッフルモード",
    orderedDescription: "チャプターとサブチャプターに従って順番に学習します。",
    shuffleDescription: "異なるカテゴリーオプションでランダムに学習します。",
    startStudy: "学習開始",
    startShuffle: "シャッフル開始",

    // Chapter Management
    chapterTitle: "チャプタータイトル",
    enterChapterTitle: "チャプタータイトルを入力",
    addChapter: "チャプター追加",
    editChapter: "チャプター編集",
    deleteChapter: "チャプター削除",
    subchapterTitle: "サブチャプタータイトル",
    enterSubchapterTitle: "サブチャプタータイトルを入力",
    addSubchapter: "サブチャプター追加",
    editSubchapter: "サブチャプター編集",
    deleteSubchapter: "サブチャプター削除",
    allCards: "すべてのカード",

    // Flashcard Management
    showAnswer: "答えを表示",
    uploadImage: "画像アップロード",
    playAudio: "音声再生",
    addValue: "値を追加",
    saveFlashcard: "フラッシュカードを保存",
    delete: "削除",

    // Categories
    selectCategory: "カテゴリー選択",
    allCategories: "すべてのカード",

    // Alerts
    chapterExists: "チャプター名が既に存在します。別の名前を使用してください。",
    subchapterExists: "このチャプターにサブチャプター名が既に存在します。別の名前を使用してください。",
    selectChapterFirst: "最初にチャプターを選択してください",
    keyExists: "このチャプター/サブチャプターにキーが既に存在します。別のキーを使用してください。",
    confirmDeleteChapter: "このチャプターを削除してもよろしいですか？このチャプター内のすべてのフラッシュカードが削除されます。",
    confirmDeleteSubchapter: "このサブチャプターを削除してもよろしいですか？このサブチャプター内のすべてのフラッシュカードが削除されます。",
    invalidZipFormat: "無効なZIP形式です。chapters.jsonとflashcards.jsonが含まれていることを確認してください。",
    errorReadingZip: "ZIPファイルの読み込みエラー",
    errorUploadingImage: "画像のアップロードエラー",

    // Zip Management
    uploadZip: "ZIPアップロード",
    downloadZip: "ZIPダウンロード",

    // Input placeholders & labels
    enterKey: "キーを入力",
    enterValue: "値を入力",
    enterAudioUrl: "音声URLを入力",
    key: "キー",
    value: "値",
    audioUrl: "音声URL",

    // Flashcard types
    text: "テキスト",
    picture: "画像",
    audio: "音声",

    // Flashcard actions
    flipCard: "カードを裏返す",
    preview: "プレビュー",

    // Validation messages
    pleaseEnterKey: "キーを入力してください",
    pleaseAddValue: "少なくとも1つの値を追加してください",
    pleaseFillValues: "すべての値を入力してください",
    confirmDelete: "削除してもよろしいですか？",

    // Welcome messages
    welcomeTitle: "MEMOSHEへようこそ",
    welcomeSubtitle: "インタラクティブなフラッシュカード学習プラットフォーム",
    getStarted: "始めましょう",
    
    // Common texts
    loading: "読み込み中...",
    noCards: "カードがありません",
    noChapters: "チャプターがありません",
    
    // Footer
    footerText: "© 2024 MEMOSHE. 全著作権所有。",
    
    // Error messages
    errorLoading: "データの読み込みエラー",
    tryAgain: "再試行",
  },
  ko: {
    // Header
    home: "홈",
    flashcards: "플래시카드",
    study: "학습",
    about: "소개",
    login: "로그인",

    // Study Mode
    studyMode: "학습 모드",
    orderedMode: "학습 모드",
    shuffleMode: "셔플 모드",
    orderedDescription: "챕터와 서브챕터에 따라 순차적으로 학습합니다.",
    shuffleDescription: "다양한 카테고리 옵션으로 무작위 학습을 합니다.",
    startStudy: "학습 시작",
    startShuffle: "셔플 시작",

    // Chapter Management
    chapterTitle: "챕터 제목",
    enterChapterTitle: "챕터 제목 입력",
    addChapter: "챕터 추가",
    editChapter: "챕터 편집",
    deleteChapter: "챕터 삭제",
    subchapterTitle: "서브챕터 제목",
    enterSubchapterTitle: "서브챕터 제목 입력",
    addSubchapter: "서브챕터 추가",
    editSubchapter: "서브챕터 편집",
    deleteSubchapter: "서브챕터 삭제",
    allCards: "모든 카드",

    // Flashcard Management
    showAnswer: "답 보기",
    uploadImage: "이미지 업로드",
    playAudio: "오디오 재생",
    addValue: "값 추가",
    saveFlashcard: "플래시카드 저장",
    delete: "삭제",

    // Categories
    selectCategory: "카테고리 선택",
    allCategories: "모든 카드",

    // Alerts
    chapterExists: "챕터 이름이 이미 존재합니다. 다른 이름을 사용해주세요.",
    subchapterExists: "이 챕터에 서브챕터 이름이 이미 존재합니다. 다른 이름을 사용해주세요.",
    selectChapterFirst: "먼저 챕터를 선택해주세요",
    keyExists: "이 챕터/서브챕터에 키가 이미 존재합니다. 다른 키를 사용해주세요.",
    confirmDeleteChapter: "이 챕터를 삭제하시겠습니까? 이 챕터의 모든 플래시카드가 삭제됩니다.",
    confirmDeleteSubchapter: "이 서브챕터를 삭제하시겠습니까? 이 서브챕터의 모든 플래시카드가 삭제됩니다.",
    invalidZipFormat: "잘못된 ZIP 형식입니다. chapters.json과 flashcards.json이 포함되어 있는지 확인해주세요.",
    errorReadingZip: "ZIP 파일 읽기 오류",
    errorUploadingImage: "이미지 업로드 오류",

    // Zip Management
    uploadZip: "ZIP 업로드",
    downloadZip: "ZIP 다운로드",

    // Input placeholders & labels
    enterKey: "키 입력",
    enterValue: "값 입력",
    enterAudioUrl: "오디오 URL 입력",
    key: "키",
    value: "값",
    audioUrl: "오디오 URL",

    // Flashcard types
    text: "텍스트",
    picture: "이미지",
    audio: "오디오",

    // Flashcard actions
    flipCard: "카드 뒤집기",
    preview: "미리보기",

    // Validation messages
    pleaseEnterKey: "키를 입력해주세요",
    pleaseAddValue: "최소 하나의 값을 추가해주세요",
    pleaseFillValues: "모든 값을 입력해주세요",
    confirmDelete: "삭제하시겠습니까?",

    // Welcome messages
    welcomeTitle: "MEMOSHE에 오신 것을 환영합니다",
    welcomeSubtitle: "인터랙티브 플래시카드 학습 플랫폼",
    getStarted: "시작하기",
    
    // Common texts
    loading: "로딩 중...",
    noCards: "카드가 없습니다",
    noChapters: "챕터가 없습니다",
    
    // Footer
    footerText: "© 2024 MEMOSHE. 모든 권리 보유.",
    
    // Error messages
    errorLoading: "데이터 로딩 오류",
    tryAgain: "다시 시도",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.id;