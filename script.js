
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

    if (
        typeof window.docx === "undefined"
    ) {

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


document.head.appendChild(
    docxScript
);


// =====================================================
// POLICE
// =====================================================

const POLICE_ARABE =
    "Traditional Arabic";


// =====================================================
// DÉTECTION MOBILE
// =====================================================

function estAppareilMobile() {

    return /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );

}


// =====================================================
// CHARGER UNE IMAGE
// =====================================================

async function chargerImage(
    chemin
) {

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
        await fetch(
            imageUrl
        );

    if (
        !response.ok
    ) {

        throw new Error(

            "Impossible de charger l'image : " +
            imageUrl +
            " - HTTP " +
            response.status

        );

    }

    const buffer =
        await response.arrayBuffer();

    return new Uint8Array(
        buffer
    );

}


// =====================================================
// TÉLÉCHARGER WORD
// PC + MOBILE
// =====================================================

async function telechargerWord(
    blob,
    fileName
) {

    if (
        !blob ||
        blob.size === 0
    ) {

        throw new Error(
            "Le fichier Word est vide."
        );

    }


    // =================================================
    // VRAI TYPE DOCX
    // =================================================

    const wordBlob =
        new Blob(
            [blob],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        );


    console.log(
        "Word MIME :",
        wordBlob.type
    );


    console.log(
        "Word taille :",
        wordBlob.size
    );


    if (
        wordBlob.size === 0
    ) {

        throw new Error(
            "Le fichier Word généré est vide."
        );

    }


    // =================================================
    // CRÉER URL
    // =================================================

    const url =
        URL.createObjectURL(
            wordBlob
        );


    // =================================================
    // LIEN DE TÉLÉCHARGEMENT
    // =================================================

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


    // =================================================
    // TÉLÉCHARGEMENT
    // =================================================

    link.click();


    // =================================================
    // NETTOYAGE
    // =================================================

    setTimeout(
        function () {

            if (
                link.parentNode
            ) {

                link.parentNode.removeChild(
                    link
                );

            }

            URL.revokeObjectURL(
                url
            );

        },
        60000
    );

}


// =====================================================
// DONNÉES DÉPUTÉS
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


// =====================================================
// DONNÉES MINISTRES
// =====================================================

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
// TRAITEMENT DÉPUTÉ
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
    // DÉPUTÉS
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
    // MINISTRES
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


            // =================================================
            // VALIDATIONS
            // =================================================

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


            const mobile =
                estAppareilMobile();


            console.log(
                "Appareil :",
                mobile
                    ? "MOBILE"
                    : "ORDINATEUR"
            );


            // =================================================
            // WORD
            // PC + MOBILE
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
            // CHARGEMENT IMAGES WORD
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

            catch (
                error
            ) {

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
            // TEXT RUN ARABE
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
            // PARAGRAPHE ARABE
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
            // EN-TÊTE WORD
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
            // INTRODUCTION
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
            // FORMULE
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
            // NOM WORD
            // =================================================

            const fileName =
                "question-ecrite-" +
                subject
                    .replace(
                        /[\\/:*?"<>|]/g,
                        ""
                    )
                    .trim() +
                ".docx";


            // =================================================
            // GÉNÉRATION WORD
            // PC + MOBILE
            // =================================================

            try {

                console.log(
                    "Génération du fichier Word..."
                );


                const blob =
                    await Packer.toBlob(
                        wordDocument
                    );


                await telechargerWord(
                    blob,
                    fileName
                );


                console.log(
                    "Word généré avec succès."
                );

            }

            catch (
                error
            ) {

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
            // PETITE PAUSE AVANT LE PDF
            // =================================================
            //
            // Cette pause est particulièrement utile
            // sur iPhone pour laisser Safari traiter
            // le téléchargement du Word.
            //
            // =================================================

            await new Promise(
                function (
                    resolve
                ) {

                    setTimeout(
                        resolve,
                        mobile
                            ? 1200
                            : 300
                    );

                }
            );


            // =================================================
            // PDF
            // PC + MOBILE
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

            catch (
                error
            ) {

                console.error(
                    "Erreur PDF :",
                    error
                );


                alert(
                    "Le Word a été généré, mais une erreur est survenue pendant la génération du PDF.\n\n" +
                    error.message
                );

            }

        }
    );

}


// =====================================================
// OUVRIR DIRECTEMENT LE PDF SUR MOBILE
// =====================================================

function ouvrirPDFMobile(
    pdfBlob
) {

    if (
        !pdfBlob ||
        pdfBlob.size === 0
    ) {

        throw new Error(
            "Le PDF est vide."
        );

    }


    const vraiPDF =
        new Blob(
            [pdfBlob],
            {
                type:
                    "application/pdf"
            }
        );


    console.log(
        "Ouverture PDF mobile"
    );


    console.log(
        "Type :",
        vraiPDF.type
    );


    console.log(
        "Taille :",
        vraiPDF.size
    );


    const url =
        URL.createObjectURL(
            vraiPDF
        );


    // =================================================
    // OUVERTURE DIRECTE
    // =================================================

    window.location.href =
        url;


    // =================================================
    // NE PAS SUPPRIMER IMMÉDIATEMENT
    // =================================================

    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        120000
    );

}


// =====================================================
// ENVOYER PDF MOBILE
// =====================================================

async function envoyerPDFMobile(
    blob,
    nomFichier
) {

    console.log(
        "Début traitement PDF mobile."
    );


    if (
        !blob
    ) {

        throw new Error(
            "Le Blob PDF n'existe pas."
        );

    }


    const pdfBlob =
        new Blob(
            [blob],
            {
                type:
                    "application/pdf"
            }
        );


    console.log(
        "PDF mobile MIME :",
        pdfBlob.type
    );


    console.log(
        "PDF mobile taille :",
        pdfBlob.size
    );


    if (
        pdfBlob.size === 0
    ) {

        throw new Error(
            "Le PDF généré est vide."
        );

    }


    if (
        pdfBlob.type !==
        "application/pdf"
    ) {

        throw new Error(
            "Le fichier généré n'est pas reconnu comme PDF."
        );

    }


    ouvrirPDFMobile(
        pdfBlob
    );

}


// =====================================================
// GÉNÉRATION PDF
// =====================================================

async function genererPDF(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

    // =================================================
    // VÉRIFICATION jsPDF
    // =================================================

    if (
        typeof window.jspdf ===
        "undefined"
    ) {

        throw new Error(
            "La bibliothèque jsPDF n'est pas disponible."
        );

    }


    // =================================================
    // VÉRIFICATION html2canvas
    // =================================================

    if (
        typeof window.html2canvas ===
        "undefined"
    ) {

        throw new Error(
            "La bibliothèque html2canvas n'est pas disponible."
        );

    }


    const {
        jsPDF
    } =
        window.jspdf;


    // =================================================
    // MOBILE / PC
    // =================================================

    const estMobile =
        estAppareilMobile();


    const scaleCanvas =
        estMobile
            ? 1
            : 2;


    console.log(
        "Mode PDF :",
        estMobile
            ? "MOBILE"
            : "PC"
    );


    console.log(
        "Scale :",
        scaleCanvas
    );


    // =================================================
    // CONTENEUR PDF
    // =================================================

    const pdfContainer =
        document.createElement(
            "div"
        );


    pdfContainer.style.position =
        "fixed";


    pdfContainer.style.left =
        "0";


    pdfContainer.style.top =
        "0";


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


    pdfContainer.style.pointerEvents =
        "none";


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


    // =================================================
    // CRÉER IMAGE
    // =================================================

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


        img.style.display =
            "block";


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


    // =================================================
    // TROIS IMAGES
    // =================================================

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
    // ESPACE APRÈS EN-TÊTE
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
    // AJOUTER PARAGRAPHE
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


        // =================================================
        // AUCUN ESPACE ENTRE LES PARAGRAPHES
        // =================================================

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
            line
        ) {

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
    // ESPACE SIGNATURE
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


    // =================================================
    // FORMULE
    // =================================================

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


    // =================================================
    // NOM
    // =================================================

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


    // =================================================
    // FONCTION
    // =================================================

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
                function (
                    img
                ) {

                    return new Promise(
                        function (
                            resolve
                        ) {

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
            function (
                resolve
            ) {

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
            "Largeur document :",
            largeur
        );


        console.log(
            "Hauteur document :",
            hauteur
        );


        if (
            largeur <= 0 ||
            hauteur <= 0
        ) {

            throw new Error(
                "Le contenu PDF n'a pas de dimensions valides."
            );

        }


        // =================================================
        // CRÉATION PDF
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
            largeur /
            contentWidth;


        const hauteurPageCSS =
            Math.floor(
                contentHeight *
                ratio
            );


        let position =
            0;


        let pageNumber =
            0;


        // =================================================
        // GÉNÉRATION DES PAGES
        // =================================================

        while (
            position <
            hauteur
        ) {

            pageNumber++;


            console.log(
                "Génération page :",
                pageNumber
            );


            const hauteurRestante =
                hauteur -
                position;


            const hauteurPage =
                Math.min(
                    hauteurPageCSS,
                    hauteurRestante
                );


            const pageCanvas =
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
                            hauteurPage,

                        x:
                            0,

                        y:
                            position,

                        scrollX:
                            0,

                        scrollY:
                            0,

                        windowWidth:
                            largeur,

                        windowHeight:
                            hauteurPage

                    }
                );


            if (
                !pageCanvas ||
                pageCanvas.width === 0 ||
                pageCanvas.height === 0
            ) {

                throw new Error(
                    "Impossible de créer l'image de la page PDF."
                );

            }


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
                hauteurPage /
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
                hauteurPage;


            // =================================================
            // LIBÉRER MÉMOIRE
            // =================================================

            pageCanvas.width =
                1;


            pageCanvas.height =
                1;


            if (
                estMobile
            ) {

                await new Promise(
                    function (
                        resolve
                    ) {

                        setTimeout(
                            resolve,
                            50
                        );

                    }
                );

            }

        }


        // =================================================
        // NOM PDF
        // =================================================

        const nomFichier =
            "question-ecrite.pdf";


        // =================================================
        // BLOB PDF
        // =================================================

        const blob =
            pdf.output(
                "blob"
            );


        console.log(
            "Blob original :",
            blob
        );


        console.log(
            "Type original :",
            blob.type
        );


        console.log(
            "Taille originale :",
            blob.size
        );


        // =================================================
        // VRAI BLOB PDF
        // =================================================

        const pdfBlob =
            new Blob(
                [blob],
                {
                    type:
                        "application/pdf"
                }
            );


        console.log(
            "PDF final :",
            pdfBlob
        );


        console.log(
            "PDF final MIME :",
            pdfBlob.type
        );


        console.log(
            "PDF final taille :",
            pdfBlob.size
        );


        // =================================================
        // VÉRIFICATION
        // =================================================

        if (
            pdfBlob.size === 0
        ) {

            throw new Error(
                "Le PDF généré est vide."
            );

        }


        if (
            pdfBlob.type !==
            "application/pdf"
        ) {

            throw new Error(
                "Le type du fichier généré n'est pas application/pdf."
            );

        }


        // =================================================
        // MOBILE
        // =================================================

        if (
            estMobile
        ) {

            console.log(
                "Ouverture directe du PDF sur mobile..."
            );


            await envoyerPDFMobile(

                pdfBlob,

                nomFichier

            );

        }


        // =================================================
        // PC
        // =================================================

        else {

            const url =
                URL.createObjectURL(
                    pdfBlob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                nomFichier;


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
                30000
            );

        }

    }

    catch (
        error
    ) {

        console.error(
            "Erreur PDF :",
            error
        );


        throw error;

    }

    finally {

        // =================================================
        // SUPPRIMER CONTENEUR
        // =================================================

        if (
            pdfContainer.parentNode
        ) {

            pdfContainer.parentNode.removeChild(
                pdfContainer
            );

        }

    }

}


alert('test')