
// =====================================================
// GÉNÉRATEUR QUESTION ÉCRITE
// WORD + PDF
// PC + MOBILE
// =====================================================


// =====================================================
// CONFIGURATION
// =====================================================

alert('test app 7')

const POLICE_ARABE = "Traditional Arabic";


// =====================================================
// CHARGEMENT D'UNE LIBRAIRIE EXTERNE
// =====================================================

function chargerScriptExterne(src) {

    return new Promise(function (resolve, reject) {

        // Vérifier si le script existe déjà
        const scripts = document.querySelectorAll("script");

        for (const script of scripts) {

            if (script.src === src) {
                resolve();
                return;
            }

        }

        const script = document.createElement("script");

        script.src = src;

        script.onload = function () {
            resolve();
        };

        script.onerror = function () {
            reject(
                new Error(
                    "Impossible de charger la bibliothèque : " + src
                )
            );
        };

        document.head.appendChild(script);

    });

}


// =====================================================
// CHARGER TOUTES LES LIBRAIRIES
// =====================================================

async function chargerBibliotheques() {

    try {

        // DOCX
        if (
            typeof window.docx === "undefined"
        ) {

            await chargerScriptExterne(
                "https://unpkg.com/docx@8.5.0/build/index.umd.js"
            );

        }


        // jsPDF
        if (
            typeof window.jspdf === "undefined"
        ) {

            await chargerScriptExterne(
                "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
            );

        }


        // html2canvas
        if (
            typeof window.html2canvas === "undefined"
        ) {

            await chargerScriptExterne(
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
            );

        }


        console.log(
            "DOCX :",
            typeof window.docx
        );

        console.log(
            "jsPDF :",
            typeof window.jspdf
        );

        console.log(
            "html2canvas :",
            typeof window.html2canvas
        );


        if (
            typeof window.docx === "undefined"
        ) {

            throw new Error(
                "La bibliothèque Word n'est pas disponible."
            );

        }


        if (
            typeof window.jspdf === "undefined"
        ) {

            throw new Error(
                "La bibliothèque jsPDF n'est pas disponible."
            );

        }


        if (
            typeof window.html2canvas === "undefined"
        ) {

            throw new Error(
                "La bibliothèque html2canvas n'est pas disponible."
            );

        }


        console.log(
            "Toutes les bibliothèques sont chargées."
        );


        initialiserApplication();

    }

    catch (error) {

        console.error(
            error
        );

        alert(
            "Impossible de charger les bibliothèques nécessaires.\n\n" +
            error.message
        );

    }

}


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
            "\nHTTP " +
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
// TÉLÉCHARGEMENT PC
// =====================================================

function telechargerFichier(
    blob,
    nomFichier
) {

    if (
        !blob ||
        blob.size === 0
    ) {

        throw new Error(
            "Le fichier est vide."
        );

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
        60000
    );

}


// =====================================================
// INTERFACE RÉSULTATS MOBILE
// =====================================================

// =====================================================
// INTERFACE RÉSULTATS MOBILE
// WORD + PDF
// =====================================================

function afficherResultatsMobile(
    wordBlob,
    wordFileName,
    pdfBlob
) {

    // Supprimer une ancienne interface
    const ancienne =
        document.getElementById(
            "resultats-generes"
        );

    if (ancienne) {
        ancienne.remove();
    }


    // =================================================
    // CONTAINER
    // =================================================

    const container =
        document.createElement("div");

    container.id =
        "resultats-generes";

    container.style.position =
        "fixed";

    container.style.left =
        "15px";

    container.style.right =
        "15px";

    container.style.bottom =
        "15px";

    container.style.zIndex =
        "9999999";

    container.style.background =
        "#ffffff";

    container.style.padding =
        "20px";

    container.style.borderRadius =
        "15px";

    container.style.boxShadow =
        "0 5px 30px rgba(0,0,0,0.25)";

    container.style.textAlign =
        "center";

    container.style.fontFamily =
        "Arial, sans-serif";


    // =================================================
    // TITRE
    // =================================================

    const titre =
        document.createElement("div");

    titre.textContent =
        "Documents générés avec succès";

    titre.style.fontWeight =
        "bold";

    titre.style.fontSize =
        "18px";

    titre.style.marginBottom =
        "10px";

    container.appendChild(
        titre
    );


    // =================================================
    // MESSAGE
    // =================================================

    const message =
        document.createElement("div");

    message.textContent =
        "Choisissez le fichier à enregistrer.";

    message.style.fontSize =
        "14px";

    message.style.marginBottom =
        "15px";

    message.style.color =
        "#555";

    container.appendChild(
        message
    );


    // =================================================
    // BOUTON WORD
    // =================================================

 // =====================================================
// BOUTON WORD — ENREGISTREMENT / PARTAGE MOBILE
// =====================================================

const wordButton = document.createElement("button");

wordButton.textContent = "📄 Enregistrer / partager Word";

wordButton.style.cssText = `
    width: 100%;
    padding: 14px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

wordButton.onclick = async function () {

    try {

        if (!wordBlob || wordBlob.size === 0) {
            throw new Error("Le fichier Word est vide.");
        }

        const vraiWord = new Blob(
            [wordBlob],
            {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        );

        const fichierWord = new File(
            [vraiWord],
            wordFileName,
            {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        );


        // =================================================
        // ANDROID / IPHONE : essayer le partage natif
        // =================================================

        if (navigator.share) {

            try {

                await navigator.share({
                    files: [fichierWord],
                    title: "Question écrite Word"
                });

                // Le partage a réussi
                return;

            } catch (shareError) {

                // L'utilisateur a simplement fermé le menu
                if (shareError.name === "AbortError") {

                    console.log("Partage Word annulé.");

                    return;
                }

                console.warn(
                    "Le partage Word n'est pas disponible :",
                    shareError
                );
            }
        }


        // =================================================
        // FALLBACK : TÉLÉCHARGEMENT DIRECT
        // =================================================

        const url = URL.createObjectURL(vraiWord);

        const link = document.createElement("a");

        link.href = url;
        link.download = wordFileName;

        link.style.display = "none";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        // Libérer l'URL après quelques secondes
        setTimeout(function () {

            URL.revokeObjectURL(url);

        }, 60000);


    } catch (error) {

        console.error(
            "Erreur lors de l'enregistrement Word :",
            error
        );

        alert(
            "Impossible d'enregistrer le fichier Word.\n\n" +
            error.message
        );
    }
};


// Ajouter le bouton à l'interface
container.appendChild(wordButton);

    // =================================================
    // BOUTON PDF
    // =================================================

    // =================================================
// BOUTON PDF
// =================================================

// =================================================
// BOUTON PDF
// =================================================

// const pdfButton =
//     document.createElement("button");

// pdfButton.textContent =
//     "📕 Ouvrir le PDF";

// pdfButton.style.display =
//     "block";

// pdfButton.style.width =
//     "100%";

// pdfButton.style.padding =
//     "14px";

// pdfButton.style.marginBottom =
//     "10px";

// pdfButton.style.border =
//     "none";

// pdfButton.style.borderRadius =
//     "10px";

// pdfButton.style.cursor =
//     "pointer";

// pdfButton.style.fontSize =
//     "16px";

// pdfButton.style.background =
//     "#dc2626";

// pdfButton.style.color =
//     "#ffffff";


// pdfButton.onclick =
//     async function () {

//         try {

//             // =================================================
//             // VÉRIFIER LE PDF
//             // =================================================

//             if (
//                 !pdfBlob ||
//                 pdfBlob.size === 0
//             ) {

//                 throw new Error(
//                     "Le PDF est vide."
//                 );

//             }


//             console.log(
//                 "Taille PDF :",
//                 pdfBlob.size,
//                 "octets"
//             );


//             // =================================================
//             // CRÉER UN VRAI FICHIER PDF
//             // =================================================

//             const fichierPDF =
//                 new File(
//                     [pdfBlob],
//                     "question-ecrite.pdf",
//                     {
//                         type:
//                             "application/pdf"
//                     }
//                 );


//             console.log(
//                 "Type PDF :",
//                 fichierPDF.type
//             );


//             console.log(
//                 "Nom PDF :",
//                 fichierPDF.name
//             );


//             console.log(
//                 "Taille fichier :",
//                 fichierPDF.size
//             );


//             // =================================================
//             // CRÉER URL DU FICHIER
//             // =================================================

//             const url =
//                 URL.createObjectURL(
//                     fichierPDF
//                 );


//             // =================================================
//             // OUVRIR DANS UN NOUVEL ONGLET
//             // =================================================

//             const nouvelleFenetre =
//                 window.open(
//                     url,
//                     "_blank"
//                 );


//             // =================================================
//             // SI SAFARI BLOQUE window.open()
//             // =================================================

//             if (!nouvelleFenetre) {

//                 window.location.assign(
//                     url
//                 );

//             }


//             // =================================================
//             // NE PAS SUPPRIMER TROP RAPIDEMENT
//             // =================================================

//             setTimeout(
//                 function () {

//                     URL.revokeObjectURL(
//                         url
//                     );

//                 },
//                 300000
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Erreur ouverture PDF :",
//                 error
//             );


//             alert(
//                 "Impossible d'ouvrir le PDF.\n\n" +
//                 error.message
//             );

//         }

//     };


// container.appendChild(
//     pdfButton
// );

// =================================================
// BOUTON PDF
// =================================================

const pdfButton =
    document.createElement("button");

pdfButton.textContent =
    "📕 Enregistrer / partager PDF";

pdfButton.style.display =
    "block";

pdfButton.style.width =
    "100%";

pdfButton.style.padding =
    "14px";

pdfButton.style.marginBottom =
    "10px";

pdfButton.style.border =
    "none";

pdfButton.style.borderRadius =
    "10px";

pdfButton.style.cursor =
    "pointer";

pdfButton.style.fontSize =
    "16px";

pdfButton.style.background =
    "#dc2626";

pdfButton.style.color =
    "#ffffff";


pdfButton.onclick =
    async function () {

        try {

            // =================================================
            // VÉRIFIER LE PDF
            // =================================================

            if (
                !pdfBlob ||
                pdfBlob.size === 0
            ) {

                throw new Error(
                    "Le PDF est vide."
                );

            }


            console.log(
                "PDF prêt :",
                pdfBlob.size,
                "octets"
            );


            // =================================================
            // CRÉER UN VRAI FICHIER PDF
            // =================================================

            const fichierPDF =
                new File(
                    [pdfBlob],
                    "question-ecrite.pdf",
                    {
                        type:
                            "application/pdf"
                    }
                );


            // =================================================
            // IPHONE / ANDROID
            // PARTAGE NATIF
            // =================================================

            if (
                navigator.share &&
                navigator.canShare
            ) {

                const partagePossible =
                    navigator.canShare({
                        files: [fichierPDF]
                    });


                if (
                    partagePossible
                ) {

                    await navigator.share({

                        files: [
                            fichierPDF
                        ],

                        title:
                            "Question écrite PDF"

                    });


                    return;

                }

            }


            // =================================================
            // FALLBACK MOBILE / NAVIGATEUR
            // =================================================

            const url =
                URL.createObjectURL(
                    fichierPDF
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "question-ecrite.pdf";


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
                60000
            );

        }

        catch (error) {

            console.error(
                "Erreur PDF :",
                error
            );


            // L'utilisateur peut simplement avoir
            // fermé la fenêtre de partage.
            if (
                error.name ===
                "AbortError"
            ) {

                console.log(
                    "Partage PDF annulé par l'utilisateur."
                );

                return;

            }


            alert(
                "Impossible d'enregistrer le PDF.\n\n" +
                error.message
            );

        }

    };


container.appendChild(
    pdfButton
);




    // =================================================
    // BOUTON OUVRIR PDF
    // =================================================
    // Celui-ci reste disponible si l'utilisateur
    // veut simplement consulter le PDF.

    const ouvrirPdfButton =
        document.createElement("button");

    ouvrirPdfButton.textContent =
        "👁️ Ouvrir PDF";

    ouvrirPdfButton.style.display =
        "block";

    ouvrirPdfButton.style.width =
        "100%";

    ouvrirPdfButton.style.padding =
        "12px";

    ouvrirPdfButton.style.marginBottom =
        "10px";

    ouvrirPdfButton.style.border =
        "1px solid #dc2626";

    ouvrirPdfButton.style.borderRadius =
        "10px";

    ouvrirPdfButton.style.cursor =
        "pointer";

    ouvrirPdfButton.style.fontSize =
        "15px";

    ouvrirPdfButton.style.background =
        "#ffffff";

    ouvrirPdfButton.style.color =
        "#dc2626";


    ouvrirPdfButton.onclick =
        function () {

            const vraiPDF =
                new Blob(
                    [pdfBlob],
                    {
                        type:
                            "application/pdf"
                    }
                );


            const url =
                URL.createObjectURL(
                    vraiPDF
                );


            window.open(
                url,
                "_blank"
            );


            setTimeout(
                function () {

                    URL.revokeObjectURL(
                        url
                    );

                },
                120000
            );

        };


    container.appendChild(
        ouvrirPdfButton
    );


    // =================================================
    // FERMER
    // =================================================

    const fermer =
        document.createElement("button");

    fermer.textContent =
        "Fermer";

    fermer.style.border =
        "none";

    fermer.style.background =
        "transparent";

    fermer.style.padding =
        "10px";

    fermer.style.cursor =
        "pointer";

    fermer.style.fontSize =
        "14px";

    fermer.onclick =
        function () {

            container.remove();

        };


    container.appendChild(
        fermer
    );


    // =================================================
    // AFFICHER
    // =================================================

    document.body.appendChild(
        container
    );

}


// =====================================================
// GÉNÉRATION WORD
// =====================================================

async function genererWord(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

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
    // IMAGES
    // =================================================

    const royaumeImage =
        await chargerImage(
            "images/royaumem.jpeg"
        );


    const symboleImage =
        await chargerImage(
            "images/symbole.jpeg"
        );


    const symboleamazighImage =
        await chargerImage(
            "images/symboleamazigh.jpeg"
        );


    const children = [];


    // =================================================
    // RUN ARABE
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
    // IMAGES WORD
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
            .map(function (line) {

                return line.trim();

            })
            .filter(function (line) {

                return line !== "";

            });


    lines.forEach(
        function (
            line,
            index
        ) {

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
                            index === lines.length - 1,

                        keepLines:
                            true

                    }

                )

            );

        }
    );


    // =================================================
    // SIGNATURE
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
    // DOCUMENT
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
    // NOM
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
    // BLOB WORD
    // =================================================

    const blob =
        await Packer.toBlob(
            wordDocument
        );


    if (
        !blob ||
        blob.size === 0
    ) {

        throw new Error(
            "Le fichier Word généré est vide."
        );

    }


    return {

        blob:
            new Blob(
                [blob],
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                }
            ),

        fileName:
            fileName

    };

}


// =====================================================
// CONSTRUIRE LE CONTENU PDF
// =====================================================

// =====================================================
// CONSTRUIRE LE CONTENU PDF — FORMAT IDENTIQUE A4
// =====================================================

function construirePDFContainer(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

    // =================================================
    // DIMENSIONS A4
    // 794 x 1123 px ≈ A4 à 96 DPI
    // =================================================

    const pdfContainer =
        document.createElement("div");

    pdfContainer.style.position =
        "absolute";

    pdfContainer.style.left =
        "-100000px";

    pdfContainer.style.top =
        "0";

    pdfContainer.style.width =
        "794px";

    pdfContainer.style.height =
        "1123px";

    pdfContainer.style.background =
        "#ffffff";

    pdfContainer.style.color =
        "#000000";

    pdfContainer.style.boxSizing =
        "border-box";

    pdfContainer.style.padding =
        "18px 55px 55px 55px";

    pdfContainer.style.direction =
        "rtl";

    pdfContainer.style.fontFamily =
        '"Traditional Arabic", "Arial", sans-serif';

    pdfContainer.style.overflow =
        "hidden";


    // =================================================
    // EN-TÊTE
    // =================================================

    const header =
        document.createElement("div");

    header.style.position =
        "relative";

    header.style.width =
        "100%";

    header.style.height =
        "135px";

    header.style.boxSizing =
        "border-box";


    // =================================================
    // CRÉER IMAGE
    // =================================================

    function creerImage(
        src,
        position
    ) {

        const img =
            document.createElement("img");

        img.src =
            new URL(
                src,
                document.baseURI
            ).href;

        img.style.position =
            "absolute";

        img.style.top =
            "0";

        img.style.objectFit =
            "contain";

        img.style.display =
            "block";

        img.style.margin =
            "0";


        // ---------------------------------------------
        // GAUCHE
        // ---------------------------------------------

        if (
            position === "left"
        ) {

            img.style.left =
                "0";

            img.style.width =
                "125px";

            img.style.height =
                "120px";

        }


        // ---------------------------------------------
        // CENTRE
        // ---------------------------------------------

        else if (
            position === "center"
        ) {

            img.style.left =
                "50%";

            img.style.transform =
                "translateX(-50%)";

            img.style.width =
                "180px";

            img.style.height =
                "120px";

        }


        // ---------------------------------------------
        // DROITE
        // ---------------------------------------------

        else {

            img.style.right =
                "0";

            img.style.width =
                "125px";

            img.style.height =
                "120px";

        }


        return img;

    }


    // =================================================
    // LOGOS
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
    // PETIT ESPACE APRÈS L'EN-TÊTE
    // =================================================

    const espace =
        document.createElement("div");

    espace.style.height =
        "22px";

    pdfContainer.appendChild(
        espace
    );


    // =================================================
    // FONCTION PARAGRAPHE
    // =================================================

    function ajouterParagraphe(
        contenu,
        options = {}
    ) {

        const p =
            document.createElement("div");

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
            '"Traditional Arabic", "Arial", sans-serif';

        p.style.fontSize =
            options.size ||
            "24px";

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

        p.style.wordBreak =
            "normal";

        pdfContainer.appendChild(
            p
        );

        return p;

    }


    // =================================================
    // DESTINATAIRE
    // =================================================

    ajouterParagraphe(

        "السيد رئيس مجلس النواب المحترم",

        {

            align:
                "center",

            size:
                "31px",

            bold:
                true,

            lineHeight:
                "1.2"

        }

    );


    // =================================================
    // PETIT ESPACE
    // =================================================

    const espaceDestinataire =
        document.createElement("div");

    espaceDestinataire.style.height =
        "10px";

    pdfContainer.appendChild(
        espaceDestinataire
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
                "25px",

            bold:
                true,

            lineHeight:
                "1.25"

        }

    );


    // =================================================
    // PETIT ESPACE
    // =================================================

    const espaceSujet =
        document.createElement("div");

    espaceSujet.style.height =
        "8px";

    pdfContainer.appendChild(
        espaceSujet
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
                "31px",

            bold:
                true,

            lineHeight:
                "1.2"

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
                "24px",

            lineHeight:
                "1.35"

        }

    );


    // =================================================
    // TEXTE PRINCIPAL
    // =================================================

    const lines =
        text
            .split(/\r\n|\r|\n/)
            .map(
                function(line) {

                    return line.trim();

                }
            )
            .filter(
                function(line) {

                    return line !== "";

                }
            );


    lines.forEach(

        function(line) {

            ajouterParagraphe(

                line,

                {

                    align:
                        "justify",

                    size:
                        "24px",

                    lineHeight:
                        "1.35"

                }

            );

        }

    );


    // =================================================
    // ESPACE AVANT SIGNATURE
    // =================================================

    const espaceSignature =
        document.createElement("div");

    espaceSignature.style.height =
        "10px";

    pdfContainer.appendChild(
        espaceSignature
    );


    // =================================================
    // FORMULE DE POLITESSE
    // =================================================

    ajouterParagraphe(

        "وتفضلوا بقبول فائق التقدير والاحترام",

        {

            align:
                "center",

            size:
                "31px",

            bold:
                true,

            lineHeight:
                "1.2"

        }

    );


    // =================================================
    // NOM DU DÉPUTÉ
    // =================================================

    ajouterParagraphe(

        nomDepute,

        {

            align:
                "center",

            size:
                "31px",

            bold:
                true,

            lineHeight:
                "1.2"

        }

    );


    // =================================================
    // FONCTION DU DÉPUTÉ
    // =================================================

    ajouterParagraphe(

        titreDepute,

        {

            align:
                "center",

            size:
                "27px",

            lineHeight:
                "1.2"

        }

    );


    // =================================================
    // PIED DE PAGE
    // =================================================

    const footer =
        document.createElement("div");

    footer.style.position =
        "absolute";

    footer.style.left =
        "35px";

    footer.style.right =
        "35px";

    footer.style.bottom =
        "12px";

    footer.style.height =
        "25px";

    footer.style.boxSizing =
        "border-box";

    footer.style.direction =
        "rtl";

    footer.style.textAlign =
        "center";


    // Ligne supérieure
    const ligne =
        document.createElement("div");

    ligne.style.width =
        "100%";

    ligne.style.height =
        "4px";

    ligne.style.background =
        "#000000";

    ligne.style.borderTop =
        "2px solid #000000";

    ligne.style.borderBottom =
        "1px solid #000000";

    footer.appendChild(
        ligne
    );


    // Texte du footer
    const footerText =
        document.createElement("div");

    footerText.textContent =
        "مجلس النواب - الفريق الحركي – الرباط ص.ب. 431 الهاتف 05 37 95 44 04 / 05 37 95 44 67 الفاكس 05 37 95 61 97";

    footerText.style.fontFamily =
        "Arial, sans-serif";

    footerText.style.fontSize =
        "10px";

    footerText.style.fontWeight =
        "bold";

    footerText.style.direction =
        "rtl";

    footerText.style.textAlign =
        "center";

    footerText.style.whiteSpace =
        "nowrap";

    footerText.style.marginTop =
        "2px";

    footer.appendChild(
        footerText
    );


    pdfContainer.appendChild(
        footer
    );


    // =================================================
    // AJOUT AU DOM
    // =================================================

    document.body.appendChild(
        pdfContainer
    );


    return pdfContainer;

}


// =====================================================
// GÉNÉRATION PDF — A4 FIXE
// =====================================================

async function genererPDF(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

    const {
        jsPDF
    } = window.jspdf;


    const pdfContainer =
        construirePDFContainer(

            subject,
            text,
            fonctionMinistre,
            nomDepute,
            titreDepute

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

                function(img) {

                    return new Promise(

                        function(resolve) {

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
        // ATTENDRE LE RENDU DU DOM
        // =================================================

        await new Promise(

            function(resolve) {

                requestAnimationFrame(

                    function() {

                        requestAnimationFrame(
                            resolve
                        );

                    }

                );

            }

        );


        // =================================================
        // CANVAS A4
        // =================================================

        const canvas =
            await window.html2canvas(

                pdfContainer,

                {

                    scale:
                        2,

                    backgroundColor:
                        "#ffffff",

                    useCORS:
                        true,

                    allowTaint:
                        false,

                    logging:
                        false,

                    width:
                        794,

                    height:
                        1123,

                    windowWidth:
                        794,

                    windowHeight:
                        1123,

                    scrollX:
                        0,

                    scrollY:
                        0

                }

            );


        if (
            !canvas ||
            canvas.width === 0 ||
            canvas.height === 0
        ) {

            throw new Error(
                "Impossible de créer le rendu PDF."
            );

        }


        console.log(
            "Canvas A4 :",
            canvas.width,
            "x",
            canvas.height
        );


        // =================================================
        // CRÉER PDF A4
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


        const largeurPDF =
            210;

        const hauteurPDF =
            297;


        // =================================================
        // IMAGE UNIQUE — PAGE A4
        // =================================================

        const imageData =
            canvas.toDataURL(
                "image/jpeg",
                0.95
            );


        pdf.addImage(

            imageData,

            "JPEG",

            0,

            0,

            largeurPDF,

            hauteurPDF,

            undefined,

            "FAST"

        );


        // =================================================
        // BLOB FINAL
        // =================================================

        const pdfBlob =
            pdf.output(
                "blob"
            );


        if (
            !pdfBlob ||
            pdfBlob.size === 0
        ) {

            throw new Error(
                "Le PDF généré est vide."
            );

        }


        console.log(
            "PDF généré :",
            pdfBlob.size,
            "octets"
        );


        return pdfBlob;

    }

    finally {

        // =================================================
        // SUPPRIMER LE CONTENEUR TEMPORAIRE
        // =================================================

        if (
            pdfContainer &&
            pdfContainer.parentNode
        ) {

            pdfContainer.parentNode.removeChild(
                pdfContainer
            );

        }

    }

}

// =====================================================
// INITIALISATION APPLICATION
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

            // Empêcher double clic
            generateButton.disabled =
                true;


            const ancienTexte =
                generateButton.textContent;


            generateButton.textContent =
                "Génération en cours...";


            try {

                // =================================================
                // RÉCUPÉRER DONNÉES
                // =================================================

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
                // =================================================

                console.log(
                    "Génération Word..."
                );


                const word =
                    await genererWord(

                        subject,

                        text,

                        fonctionMinistre,

                        nomDepute,

                        titreDepute

                    );


                console.log(
                    "Word généré :",
                    word.blob.size
                );


                // =================================================
                // PDF
                // =================================================

                console.log(
                    "Génération PDF..."
                );


                const pdfBlob =
                    await genererPDF(

                        subject,

                        text,

                        fonctionMinistre,

                        nomDepute,

                        titreDepute

                    );


                console.log(
                    "PDF généré :",
                    pdfBlob.size
                );


                // =================================================
                // MOBILE
                // =================================================

                if (
                    mobile
                ) {

                    afficherResultatsMobile(

                        word.blob,

                        word.fileName,

                        pdfBlob

                    );

                }


                // =================================================
                // PC
                // =================================================

                else {

                    telechargerFichier(

                        word.blob,

                        word.fileName

                    );


                    await new Promise(
                        function (
                            resolve
                        ) {

                            setTimeout(
                                resolve,
                                500
                            );

                        }
                    );


                    telechargerFichier(

                        pdfBlob,

                        "question-ecrite.pdf"

                    );

                }


                console.log(
                    "Word et PDF générés avec succès."
                );

            }

            catch (error) {

                console.error(
                    "Erreur génération :",
                    error
                );


                alert(

                    "Une erreur est survenue pendant la génération.\n\n" +
                    error.message

                );

            }

            finally {

                generateButton.disabled =
                    false;


                generateButton.textContent =
                    ancienTexte;

            }

        }
    );

}


// =====================================================
// DÉMARRAGE
// =====================================================

chargerBibliotheques();


