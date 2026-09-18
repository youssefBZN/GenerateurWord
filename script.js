// =====================================================
// CHARGEMENT DE LA LIBRAIRIE DOCX
// =====================================================

const docxScript = document.createElement("script");

docxScript.src =
    "https://unpkg.com/docx@8.5.0/build/index.umd.js";

docxScript.onload = function () {

    console.log(
        "Bibliothèque DOCX chargée :",
        typeof window.docx
    );

    if (typeof window.docx === "undefined") {

        console.error(
            "window.docx est undefined."
        );

        alert(
            "Erreur : la librairie Word n'est pas disponible."
        );

        return;
    }

    initialiserApplication();
};

docxScript.onerror = function () {

    console.error(
        "Impossible de charger la librairie DOCX."
    );

    alert(
        "Impossible de charger la librairie Word. Vérifiez votre connexion Internet."
    );
};

document.head.appendChild(docxScript);


// =====================================================
// POLICE UTILISÉE DANS WORD
// =====================================================

const POLICE_ARABE = "Traditional Arabic";


// =====================================================
// CHARGER UNE IMAGE
// =====================================================

async function chargerImage(chemin) {

    const imageUrl =
        new URL(
            chemin,
            document.baseURI
        ).href;

    console.log(
        "Chargement image :",
        imageUrl
    );

    const response =
        await fetch(imageUrl);

    if (!response.ok) {

        throw new Error(
            "Impossible de charger l'image : " +
            imageUrl +
            " - HTTP " +
            response.status
        );
    }

    const buffer =
        await response.arrayBuffer();

    return new Uint8Array(buffer);
}


// =====================================================
// TÉLÉCHARGER WORD
// =====================================================

async function telechargerWord(
    blob,
    fileName
) {

    const wordFile =
        new File(
            [blob],
            fileName,
            {
                type:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        );

    const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );

    if (
        isMobile &&
        navigator.share &&
        navigator.canShare
    ) {

        try {

            const shareData = {

                files: [
                    wordFile
                ],

                title:
                    "Question écrite",

                text:
                    "Question écrite"

            };

            if (
                navigator.canShare(
                    shareData
                )
            ) {

                await navigator.share(
                    shareData
                );

                return;
            }

        }

        catch (error) {

            if (
                error.name ===
                "AbortError"
            ) {

                return;
            }

            console.error(
                "Erreur partage mobile :",
                error
            );
        }
    }


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;

    link.download =
        fileName;

    link.style.display =
        "none";


    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );


    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        10000
    );
}


// =====================================================
// DONNÉES
// =====================================================

const deputes = [

    {
        nom:
            "السيدة النائبة عزيزة بوجريدة"
    },

    {
        nom:
            "السيد النائب نبيل الدخش"
    }

];


const ministres = [

    {
        fonction:
            "السيد وزير الداخلية"
    },

    {
        fonction:
            "السيد وزير الشؤون الخارجية والتعاون الإفريقي والمغاربة المقيمين بالخارج"
    },

    {
        fonction:
            "السيد وزير العدل"
    },

    {
        fonction:
            "السيد وزير الأوقاف والشؤون الإسلامية"
    },

    {
        fonction:
            "السيدة وزيرة الاقتصاد والمالية"
    },

    {
        fonction:
            "السيد وزير التجهيز والماء"
    },

    {
        fonction:
            "السيد وزير التربية الوطنية والتعليم الأولي والرياضة"
    },

    {
        fonction:
            "السيد وزير الصحة والحماية الاجتماعية"
    },

    {
        fonction:
            "السيدة وزيرة إعداد التراب الوطني والتعمير والإسكان وسياسة المدينة"
    },

    {
        fonction:
            "السيد وزير الفلاحة والصيد البحري والتنمية القروية والمياه والغابات"
    },

    {
        fonction:
            "السيد وزير الإدماج الاقتصادي والمقاولة الصغرى والتشغيل والكفاءات"
    },

    {
        fonction:
            "السيد وزير الصناعة والتجارة"
    },

    {
        fonction:
            "السيدة وزيرة السياحة والصناعة التقليدية والاقتصاد الاجتماعي والتضامني"
    },

    {
        fonction:
            "السيد وزير التعليم العالي والبحث العلمي والابتكار"
    },

    {
        fonction:
            "السيدة وزيرة الانتقال الطاقي والتنمية المستدامة"
    },

    {
        fonction:
            "السيد وزير النقل واللوجيستيك"
    },

    {
        fonction:
            "السيد وزير الشباب والثقافة والتواصل"
    },

    {
        fonction:
            "السيدة وزيرة التضامن والإدماج الاجتماعي والأسرة"
    },

    {
        fonction:
            "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بإدارة الدفاع الوطني"
    },

    {
        fonction:
            "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بالاستثمار والتقائية وتقييم السياسات العمومية"
    },

    {
        fonction:
            "السيد الوزير المنتدب لدى وزيرة الاقتصاد والمالية المكلف بالميزانية"
    },

    {
        fonction:
            "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بالعلاقات مع البرلمان، الناطق الرسمي باسم الحكومة"
    },

    {
        fonction:
            "السيدة الوزيرة المنتدبة لدى رئيس الحكومة المكلفة بالانتقال الرقمي وإصلاح الإدارة"
    },

    {
        fonction:
            "السيدة كاتبة الدولة المكلفة بالصيد البحري"
    },

    {
        fonction:
            "السيد كاتب الدولة المكلف بالتجارة الخارجية"
    },

    {
        fonction:
            "السيد كاتب الدولة المكلف بالإسكان"
    },

    {
        fonction:
            "السيد كاتب الدولة المكلف بالشغل"
    },

    {
        fonction:
            "السيد كاتب الدولة المكلف بالصناعة التقليدية والاقتصاد الاجتماعي والتضامني"
    },

    {
        fonction:
            "السيد كاتب الدولة المكلف بالإدماج الاجتماعي"
    }

];


// =====================================================
// TRAITEMENT DU DÉPUTÉ
// =====================================================

function traiterDepute(
    depute
) {

    const nomOriginal =
        depute.nom.trim();


    let titreDepute;


    if (
        nomOriginal.startsWith(
            "السيد النائب"
        )
    ) {

        titreDepute =
            "نائب برلماني";

    }

    else if (
        nomOriginal.startsWith(
            "السيدة النائبة"
        )
    ) {

        titreDepute =
            "نائبة برلمانية";

    }

    else {

        titreDepute =
            "نائب برلماني";

    }


    const nomDepute =
        nomOriginal

            .replace(
                /^السيد النائب\s*/u,
                ""
            )

            .replace(
                /^السيدة النائبة\s*/u,
                ""
            );


    return {

        nomDepute:
            nomDepute,

        titreDepute:
            titreDepute

    };

}


// =====================================================
// INITIALISATION
// =====================================================

function initialiserApplication() {

    const deputeSelect =
        document.getElementById(
            "depute_id"
        );


    const ministreSelect =
        document.getElementById(
            "ministre_id"
        );


    const subjectInput =
        document.getElementById(
            "subject"
        );


    const textInput =
        document.getElementById(
            "text"
        );


    const generateButton =
        document.getElementById(
            "generateWord"
        );


    if (
        !deputeSelect ||
        !ministreSelect ||
        !subjectInput ||
        !textInput ||
        !generateButton
    ) {

        console.error(
            "Un ou plusieurs éléments HTML sont introuvables."
        );

        return;
    }


    // =================================================
    // REMPLIR DÉPUTÉS
    // =================================================

    deputes.forEach(
        function (
            depute,
            index
        ) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                index;

            option.textContent =
                depute.nom;

            deputeSelect.appendChild(
                option
            );

        }
    );


    // =================================================
    // REMPLIR MINISTRES
    // =================================================

    ministres.forEach(
        function (
            ministre,
            index
        ) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                index;

            option.textContent =
                ministre.fonction;

            ministreSelect.appendChild(
                option
            );

        }
    );


    // =================================================
    // BOUTON
    // =================================================

    generateButton.addEventListener(
        "click",
        async function () {

            const subject =
                subjectInput.value.trim();


            const text =
                textInput.value.trim();


            const deputeIndex =
                deputeSelect.value;


            const ministreIndex =
                ministreSelect.value;


            if (
                deputeIndex === ""
            ) {

                alert(
                    "Veuillez choisir un député."
                );

                return;
            }


            if (
                ministreIndex === ""
            ) {

                alert(
                    "Veuillez choisir le ministre concerné."
                );

                return;
            }


            if (
                subject === ""
            ) {

                alert(
                    "Veuillez saisir le sujet."
                );

                return;
            }


            if (
                text === ""
            ) {

                alert(
                    "Veuillez saisir le texte."
                );

                return;
            }


            const depute =
                deputes[
                    Number(
                        deputeIndex
                    )
                ];


            const ministre =
                ministres[
                    Number(
                        ministreIndex
                    )
                ];


            const {

                nomDepute,
                titreDepute

            } =
                traiterDepute(
                    depute
                );


            const fonctionMinistre =
                ministre.fonction;


            // =================================================
            // LIBRAIRIE DOCX
            // =================================================

            const {

                Document,
                Packer,
                Paragraph,
                TextRun,
                AlignmentType,
                ImageRun,
                HorizontalPositionRelativeFrom,
                VerticalPositionRelativeFrom

            } =
                window.docx;


            // =================================================
            // CHARGEMENT DES IMAGES
            // =================================================

            let royaumeImage;
            let symboleImage;
            let symboleamazighImage;


            try {

                royaumeImage =
                    await chargerImage(
                        "images/royaumem.jpeg"
                    );


                symboleImage =
                    await chargerImage(
                        "images/symbole.jpeg"
                    );


                symboleamazighImage =
                    await chargerImage(
                        "images/symboleamazigh.jpeg"
                    );

            }

            catch (error) {

                console.error(
                    error
                );

                alert(
                    "Impossible de charger les images.\n\n" +
                    error.message
                );

                return;
            }


            const children = [];


            // =================================================
            // FONCTION TEXT RUN RTL
            // =================================================
            //
            // C'EST LA CORRECTION PRINCIPALE.
            //
            // rightToLeft:true
            // = w:rtl dans le DOCX
            //
            // =================================================

            function runArabe(
                texte,
                options = {}
            ) {

                return new TextRun({

                    text:
                        texte,

                    font:
                        options.font ||
                        POLICE_ARABE,

                    size:
                        options.size ||
                        36,

                    bold:
                        options.bold ||
                        false,

                    rightToLeft:
                        true

                });

            }


            // =================================================
            // PARAGRAPHE RTL
            // =================================================

            function paragrapheArabe(
                texte,
                options = {}
            ) {

                return new Paragraph({

                    alignment:
                        options.alignment ||
                        AlignmentType.JUSTIFIED,

                    bidirectional:
                        true,

                    keepNext:
                        options.keepNext ||
                        false,

                    keepLines:
                        options.keepLines ||
                        false,

                    spacing: {

                        before:
                            options.before ||
                            0,

                        after:
                            options.after ||
                            0,

                        line:
                            options.line ||
                            276

                    },

                    children: [

                        runArabe(
                            texte,
                            {
                                size:
                                    options.size ||
                                    36,

                                bold:
                                    options.bold ||
                                    false
                            }
                        )

                    ]

                });

            }


            // =================================================
            // IMAGE GAUCHE
            // =================================================

            const symboleamazighImageRun =
                new ImageRun({

                    data:
                        symboleamazighImage,

                    transformation: {

                        width:
                            120,

                        height:
                            120

                    },

                    floating: {

                        horizontalPosition: {

                            relative:
                                HorizontalPositionRelativeFrom.PAGE,

                            align:
                                "left"

                        },

                        verticalPosition: {

                            relative:
                                VerticalPositionRelativeFrom.PAGE,

                            offset:
                                0

                        },

                        allowOverlap:
                            true,

                        lockAnchor:
                            true,

                        behindDocument:
                            false,

                        layoutInCell:
                            true

                    }

                });


            // =================================================
            // IMAGE DROITE
            // =================================================

            const symboleImageRun =
                new ImageRun({

                    data:
                        symboleImage,

                    transformation: {

                        width:
                            120,

                        height:
                            120

                    },

                    floating: {

                        horizontalPosition: {

                            relative:
                                HorizontalPositionRelativeFrom.PAGE,

                            align:
                                "right"

                        },

                        verticalPosition: {

                            relative:
                                VerticalPositionRelativeFrom.PAGE,

                            offset:
                                0

                        },

                        allowOverlap:
                            true,

                        lockAnchor:
                            true,

                        behindDocument:
                            false,

                        layoutInCell:
                            true

                    }

                });


            // =================================================
            // IMAGE CENTRALE
            // =================================================

            const royaumeImageRun =
                new ImageRun({

                    data:
                        royaumeImage,

                    transformation: {

                        width:
                            200,

                        height:
                            120

                    },

                    floating: {

                        horizontalPosition: {

                            relative:
                                HorizontalPositionRelativeFrom.PAGE,

                            align:
                                "center"

                        },

                        verticalPosition: {

                            relative:
                                VerticalPositionRelativeFrom.PAGE,

                            offset:
                                0

                        },

                        allowOverlap:
                            true,

                        lockAnchor:
                            true,

                        behindDocument:
                            false,

                        layoutInCell:
                            true

                    }

                });


            // =================================================
            // EN-TÊTE
            // =================================================

            children.push(

                new Paragraph({

                    spacing: {

                        before:
                            0,

                        after:
                            0

                    },

                    children: [

                        symboleImageRun,

                        royaumeImageRun,

                        symboleamazighImageRun

                    ]

                })

            );


            // =================================================
            // DESTINATAIRE
            // =================================================

            children.push(

                paragrapheArabe(

                    "السيد رئيس مجلس النواب المحترم.",

                    {

                        alignment:
                            AlignmentType.CENTER,

                        size:
                            44,

                        bold:
                            true,

                        before:
                            2400,

                        line:
                            276

                    }

                )

            );


            // =================================================
            // SUJET
            // =================================================

            children.push(

                paragrapheArabe(

                    "الموضوع: سؤال كتابي حول " +
                    subject,

                    {

                        alignment:
                            AlignmentType.JUSTIFIED,

                        size:
                            40,

                        bold:
                            true,

                        line:
                            276

                    }

                )

            );


            // =================================================
            // SALUTATION
            // =================================================

            children.push(

                paragrapheArabe(

                    "سلام تام بوجود مولانا الإمام،",

                    {

                        alignment:
                            AlignmentType.CENTER,

                        size:
                            44,

                        bold:
                            true,

                        line:
                            276

                    }

                )

            );


            // =================================================
            // INTRODUCTION + MINISTRE
            // =================================================

            children.push(

                paragrapheArabe(

                    "طبقا لمقتضيات النظام الداخلي لمجلس النواب، يشرفني أن ألتمس من سيادتكم رفع السؤال الكتابي التالي إلى " +
                    fonctionMinistre,

                    {

                        alignment:
                            AlignmentType.JUSTIFIED,

                        size:
                            36,

                        line:
                            240

                    }

                )

            );


            // =================================================
            // TEXTE
            // =================================================

            const lines =
                text
                    .split(/\r\n|\r|\n/)
                    .map(
                        function (
                            line
                        ) {

                            return line.trim();

                        }
                    )
                    .filter(
                        function (
                            line
                        ) {

                            return line !== "";

                        }
                    );


            lines.forEach(
                function (
                    line,
                    index
                ) {

                    const estDerniereLigne =
                        index ===
                        lines.length - 1;


                    children.push(

                        paragrapheArabe(

                            line,

                            {

                                alignment:
                                    AlignmentType.JUSTIFIED,

                                size:
                                    36,

                                line:
                                    276,

                                keepNext:
                                    estDerniereLigne,

                                keepLines:
                                    true

                            }

                        )

                    );

                }
            );


            // =================================================
            // FORMULE DE POLITESSE
            // =================================================

            children.push(

                paragrapheArabe(

                    "وتفضلوا بقبول فائق التقدير والاحترام",

                    {

                        alignment:
                            AlignmentType.CENTER,

                        size:
                            44,

                        bold:
                            true,

                        keepNext:
                            true,

                        keepLines:
                            true,

                        line:
                            240

                    }

                )

            );


            // =================================================
            // NOM
            // =================================================

            children.push(

                paragrapheArabe(

                    nomDepute,

                    {

                        alignment:
                            AlignmentType.CENTER,

                        size:
                            44,

                        bold:
                            true,

                        keepNext:
                            true,

                        keepLines:
                            true,

                        line:
                            240

                    }

                )

            );


            // =================================================
            // FONCTION
            // =================================================

            children.push(

                paragrapheArabe(

                    titreDepute,

                    {

                        alignment:
                            AlignmentType.CENTER,

                        size:
                            36,

                        keepLines:
                            true,

                        line:
                            240

                    }

                )

            );


            // =================================================
            // DOCUMENT WORD
            // =================================================

            const wordDocument =
                new Document({

                    sections: [

                        {

                            properties: {

                                page: {

                                    margin: {

                                        top:
                                            100,

                                        bottom:
                                            1000,

                                        left:
                                            1000,

                                        right:
                                            1000

                                    }

                                }

                            },

                            children:
                                children

                        }

                    ]

                });


            // =================================================
            // NOM DU FICHIER
            // =================================================

            const fileName =
                "سؤال كتابي حول " +
                subject +
                ".docx";


            // =================================================
            // GÉNÉRATION WORD
            // =================================================

            try {

                const blob =
                    await Packer.toBlob(
                        wordDocument
                    );


                const wordBlob =
                    new Blob(
                        [blob],
                        {

                            type:
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                        }
                    );


                await telechargerWord(
                    wordBlob,
                    fileName
                );


                console.log(
                    "Word généré avec succès."
                );

            }

            catch (error) {

                console.error(
                    "Erreur Word :",
                    error
                );


                alert(
                    "Erreur pendant la génération Word.\n\n" +
                    error.message
                );


                return;

            }


            // =================================================
            // GÉNÉRER PDF DIRECT
            // =================================================

            try {

                await genererPDF(

                    subject,

                    text,

                    fonctionMinistre,

                    nomDepute,

                    titreDepute

                );

            }

            catch (error) {

                console.error(
                    "Erreur PDF :",
                    error
                );

            }

        }
    );

}


// =====================================================
// GÉNÉRATION PDF DIRECT
// =====================================================

async function genererPDF(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

    if (
        typeof window.jspdf ===
        "undefined"
    ) {

        alert(
            "La bibliothèque jsPDF n'est pas disponible."
        );

        return;
    }


    if (
        typeof window.html2canvas ===
        "undefined"
    ) {

        alert(
            "La bibliothèque html2canvas n'est pas disponible."
        );

        return;
    }


    const {
        jsPDF
    } = window.jspdf;


    // =================================================
    // DÉTECTION MOBILE
    // =================================================

    const estMobile =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );


    // Sur mobile : scale 1
    // Sur PC : scale 2
    const scaleCanvas =
        estMobile ? 1 : 2;


    // =================================================
    // CONTENEUR
    // =================================================

    const pdfContainer =
        document.createElement(
            "div"
        );


    pdfContainer.style.position =
        "absolute";

    pdfContainer.style.left =
        "-10000px";

    pdfContainer.style.top =
        "0";


    // -------------------------------------------------
    // LARGEUR
    // -------------------------------------------------

    pdfContainer.style.width =
        "794px";


    pdfContainer.style.background =
        "#ffffff";

    pdfContainer.style.color =
        "#000000";


    pdfContainer.style.padding =
        "10px 70px 70px 70px";


    pdfContainer.style.boxSizing =
        "border-box";


    pdfContainer.style.direction =
        "rtl";


    pdfContainer.style.fontFamily =
        '"' +
        POLICE_ARABE +
        '", Arial, sans-serif';


    pdfContainer.style.zIndex =
        "999999";


    // =================================================
    // EN-TÊTE
    // =================================================

    const header =
        document.createElement(
            "div"
        );


    header.style.position =
        "relative";

    header.style.width =
        "100%";

    header.style.height =
        "120px";


    function creerImage(
        src,
        position
    ) {

        const img =
            document.createElement(
                "img"
            );


        img.src =
            new URL(
                src,
                document.baseURI
            ).href;


        img.style.position =
            "absolute";


        img.style.top =
            "0";


        img.style.width =
            position === "center"
                ? "200px"
                : "120px";


        img.style.height =
            "120px";


        img.style.objectFit =
            "contain";


        if (
            position ===
            "left"
        ) {

            img.style.left =
                "0";

        }

        else if (
            position ===
            "right"
        ) {

            img.style.right =
                "0";

        }

        else {

            img.style.left =
                "50%";

            img.style.transform =
                "translateX(-50%)";

        }


        return img;

    }


    header.appendChild(

        creerImage(
            "images/symboleamazigh.jpeg",
            "left"
        )

    );


    header.appendChild(

        creerImage(
            "images/royaumem.jpeg",
            "center"
        )

    );


    header.appendChild(

        creerImage(
            "images/symbole.jpeg",
            "right"
        )

    );


    pdfContainer.appendChild(
        header
    );


    // =================================================
    // ESPACE ENTRE EN-TÊTE ET TEXTE
    // =================================================

    const espace =
        document.createElement(
            "div"
        );


    espace.style.height =
        "150px";


    pdfContainer.appendChild(
        espace
    );


    // =================================================
    // PARAGRAPHE
    // =================================================

    function ajouterParagraphe(
        contenu,
        options = {}
    ) {

        const p =
            document.createElement(
                "div"
            );


        p.textContent =
            contenu;


        p.style.direction =
            "rtl";


        p.style.unicodeBidi =
            "plaintext";


        p.style.textAlign =
            options.align ||
            "justify";


        p.style.fontFamily =
            '"' +
            POLICE_ARABE +
            '", Arial, sans-serif';


        p.style.fontSize =
            options.size ||
            "33px";


        p.style.fontWeight =
            options.bold
                ? "bold"
                : "normal";


        p.style.lineHeight =
            options.lineHeight ||
            "1.35";


        p.style.margin =
            "0";


        p.style.padding =
            "0";


        p.style.width =
            "100%";


        p.style.boxSizing =
            "border-box";


        p.style.whiteSpace =
            "normal";


        p.style.overflowWrap =
            "break-word";


        pdfContainer.appendChild(
            p
        );


        return p;

    }


    // =================================================
    // DESTINATAIRE
    // =================================================

    ajouterParagraphe(

        "السيد رئيس مجلس النواب المحترم.",

        {
            align:
                "center",

            size:
                "40px",

            bold:
                true
        }

    );


    // =================================================
    // SUJET
    // =================================================

    ajouterParagraphe(

        "الموضوع: سؤال كتابي حول " +
        subject,

        {
            align:
                "justify",

            size:
                "36px",

            bold:
                true,

            lineHeight:
                "1.35"
        }

    );


    // =================================================
    // SALUTATION
    // =================================================

    ajouterParagraphe(

        "سلام تام بوجود مولانا الإمام،",

        {
            align:
                "center",

            size:
                "40px",

            bold:
                true
        }

    );


    // =================================================
    // INTRODUCTION
    // =================================================

    ajouterParagraphe(

        "طبقا لمقتضيات النظام الداخلي لمجلس النواب، يشرفني أن ألتمس من سيادتكم رفع السؤال الكتابي التالي إلى " +
        fonctionMinistre,

        {
            align:
                "justify",

            size:
                "33px",

            lineHeight:
                "1.35"
        }

    );


    // =================================================
    // TEXTE
    // =================================================

    const lines =
        text
            .split(/\r\n|\r|\n/)
            .map(
                function (line) {

                    return line.trim();

                }
            )
            .filter(
                function (line) {

                    return line !== "";

                }
            );


    lines.forEach(
        function (line) {

            ajouterParagraphe(

                line,

                {
                    align:
                        "justify",

                    size:
                        "33px",

                    lineHeight:
                        "1.35"
                }

            );

        }
    );


    // =================================================
    // SIGNATURE
    // =================================================

    const espaceSignature =
        document.createElement(
            "div"
        );


    espaceSignature.style.height =
        "20px";


    pdfContainer.appendChild(
        espaceSignature
    );


    ajouterParagraphe(

        "وتفضلوا بقبول فائق التقدير والاحترام",

        {
            align:
                "center",

            size:
                "40px",

            bold:
                true
        }

    );


    ajouterParagraphe(

        nomDepute,

        {
            align:
                "center",

            size:
                "40px",

            bold:
                true
        }

    );


    ajouterParagraphe(

        titreDepute,

        {
            align:
                "center",

            size:
                "33px"
        }

    );


    // =================================================
    // AJOUT AU DOM
    // =================================================

    document.body.appendChild(
        pdfContainer
    );


    try {

        // =================================================
        // ATTENDRE LES IMAGES
        // =================================================

        const images =
            pdfContainer.querySelectorAll(
                "img"
            );


        await Promise.all(

            Array.from(
                images
            ).map(
                function (img) {

                    return new Promise(
                        function (resolve) {

                            if (
                                img.complete &&
                                img.naturalWidth > 0
                            ) {

                                resolve();

                                return;

                            }


                            img.onload =
                                resolve;


                            img.onerror =
                                resolve;

                        }
                    );

                }
            )

        );


        // =================================================
        // ATTENDRE LE RENDU
        // =================================================

        await new Promise(
            function (resolve) {

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            resolve
                        );

                    }
                );

            }
        );


        // =================================================
        // DIMENSIONS
        // =================================================

        const largeur =
            pdfContainer.offsetWidth;


        const hauteur =
            pdfContainer.scrollHeight;


        console.log(
            "PDF :",
            largeur,
            "x",
            hauteur,
            "scale :",
            scaleCanvas,
            "mobile :",
            estMobile
        );


        // =================================================
        // CANVAS
        // =================================================

        const canvas =
            await html2canvas(
                pdfContainer,
                {

                    scale:
                        scaleCanvas,

                    backgroundColor:
                        "#ffffff",

                    useCORS:
                        true,

                    allowTaint:
                        false,

                    logging:
                        false,

                    width:
                        largeur,

                    height:
                        hauteur,

                    scrollX:
                        0,

                    scrollY:
                        0,

                    windowWidth:
                        largeur,

                    windowHeight:
                        hauteur

                }
            );


        // =================================================
        // PDF A4
        // =================================================

        const pdf =
            new jsPDF({

                orientation:
                    "portrait",

                unit:
                    "mm",

                format:
                    "a4",

                compress:
                    true

            });


        const margin =
            10;


        const contentWidth =
            190;


        const contentHeight =
            277;


        const ratio =
            canvas.width /
            contentWidth;


        const pixelsPerPage =
            Math.floor(
                contentHeight *
                ratio
            );


        let position =
            0;


        let pageNumber =
            0;


        // =================================================
        // PAGES
        // =================================================

        while (
            position <
            canvas.height
        ) {

            pageNumber++;


            const height =
                Math.min(
                    pixelsPerPage,

                    canvas.height -
                    position
                );


            const pageCanvas =
                document.createElement(
                    "canvas"
                );


            pageCanvas.width =
                canvas.width;


            pageCanvas.height =
                height;


            const context =
                pageCanvas.getContext(
                    "2d"
                );


            context.fillStyle =
                "#ffffff";


            context.fillRect(
                0,
                0,
                pageCanvas.width,
                pageCanvas.height
            );


            context.drawImage(

                canvas,

                0,
                position,

                canvas.width,
                height,

                0,
                0,

                canvas.width,
                height

            );


            const imageData =
                pageCanvas.toDataURL(
                    "image/jpeg",
                    estMobile
                        ? 0.85
                        : 0.95
                );


            if (
                pageNumber > 1
            ) {

                pdf.addPage();

            }


            const imageHeight =
                height /
                ratio;


            pdf.addImage(

                imageData,

                "JPEG",

                margin,

                margin,

                contentWidth,

                imageHeight,

                undefined,

                "FAST"

            );


            position +=
                height;


            // -------------------------------------------------
            // LIBÉRER LA MÉMOIRE SUR MOBILE
            // -------------------------------------------------

            pageCanvas.width = 1;

            pageCanvas.height = 1;

        }


        // =================================================
        // NOM DU FICHIER
        // =================================================

        const nomFichier =
            "سؤال كتابي حول " +
            subject +
            ".pdf";


        // =================================================
        // TÉLÉCHARGEMENT
        // =================================================

        const blob =
            pdf.output(
                "blob"
            );


        const fichier =
            new File(
                [blob],
                nomFichier,
                {
                    type:
                        "application/pdf"
                }
            );


        // =================================================
        // MOBILE : PARTAGE / ENREGISTREMENT
        // =================================================

        if (
            estMobile &&
            navigator.share
        ) {

            try {

                if (
                    !navigator.canShare ||
                    navigator.canShare({
                        files: [fichier]
                    })
                ) {

                    await navigator.share({

                        files:
                            [fichier],

                        title:
                            "Question écrite",

                        text:
                            "Question écrite"

                    });

                }

                else {

                    telechargerPDFMobile(
                        blob,
                        nomFichier
                    );

                }

            }

            catch (shareError) {

                console.log(
                    "Partage annulé ou indisponible :",
                    shareError
                );


                telechargerPDFMobile(
                    blob,
                    nomFichier
                );

            }

        }

        else {

            // PC
            telechargerPDFMobile(
                blob,
                nomFichier
            );

        }


    }

    catch (error) {

        console.error(
            "Erreur PDF :",
            error
        );


        alert(
            "Erreur pendant la génération du PDF.\n\n" +
            error.message
        );

    }

    finally {

        if (
            pdfContainer.parentNode
        ) {

            pdfContainer.parentNode.removeChild(
                pdfContainer
            );

        }

    }

}