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
            "La librairie DOCX est chargée mais window.docx est undefined."
        );

        alert(
            "Erreur : la librairie Word n'est pas disponible."
        );

        return;
    }

    // La librairie est maintenant disponible
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
// CHARGER UNE IMAGE
// =====================================================

async function chargerImage(chemin) {

    console.log(
        "Chargement de l'image :",
        chemin
    );

    // Construire une URL absolue
    const imageUrl =
        new URL(
            chemin,
            document.baseURI
        ).href;

    console.log(
        "URL complète de l'image :",
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

    console.log(
        "Image chargée avec succès :",
        imageUrl,
        buffer.byteLength,
        "octets"
    );

    return new Uint8Array(buffer);
}


// =====================================================
// TÉLÉCHARGER / PARTAGER LE FICHIER WORD
// COMPATIBLE PC + ANDROID + IPHONE
// =====================================================

async function telechargerWord(blob, fileName) {

    console.log(
        "Préparation du téléchargement Word..."
    );

    // =================================================
    // CRÉER LE FICHIER WORD
    // =================================================

    const wordFile =
        new File(
            [blob],
            fileName,
            {
                type:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        );


    // =================================================
    // DÉTECTION MOBILE
    // =================================================

    const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );


    console.log(
        "Appareil mobile :",
        isMobile
    );


    // =================================================
    // MOBILE : PARTAGE DU VRAI FICHIER DOCX
    // =================================================

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


            // Vérifier si le navigateur accepte
            // le partage du fichier DOCX

            if (
                navigator.canShare(shareData)
            ) {

                console.log(
                    "Partage du fichier Word sur mobile..."
                );


                await navigator.share(
                    shareData
                );


                console.log(
                    "Fichier Word partagé avec succès."
                );


                return;

            }

        }

        catch (error) {

            // L'utilisateur peut avoir fermé
            // la fenêtre de partage.

            if (
                error.name ===
                "AbortError"
            ) {

                console.log(
                    "Partage annulé par l'utilisateur."
                );

                return;
            }


            console.error(
                "Erreur partage mobile :",
                error
            );

        }

    }


    // =================================================
    // FALLBACK : TÉLÉCHARGEMENT CLASSIQUE
    // PC + NAVIGATEURS MOBILES NON COMPATIBLES
    // =================================================

    console.log(
        "Utilisation du téléchargement classique..."
    );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement("a");


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


    // Ne pas libérer immédiatement
    // sur certains navigateurs mobiles

    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        10000
    );


    console.log(
        "Téléchargement Word terminé."
    );
}


// =====================================================
// INITIALISATION DE L'APPLICATION
// =====================================================

function initialiserApplication() {

    console.log(
        "Initialisation de l'application..."
    );


    // =================================================
    // LISTE DES DÉPUTÉS
    // =================================================

    const deputes = [

        {
            nom: "السيدة النائبة عزيزة بوجريدة"
        },

        {
            nom: "السيد النائب نبيل الدخش"
        }

        // Ajouter ici les autres députés

    ];


    // =================================================
    // LISTE DES MINISTRES
    // =================================================

    const ministres = [

        {
            fonction: "السيد وزير الداخلية"
        },

        {
            fonction: "السيد وزير الشؤون الخارجية والتعاون الإفريقي والمغاربة المقيمين بالخارج"
        },

        {
            fonction: "السيد وزير العدل"
        },

        {
            fonction: "السيد وزير الأوقاف والشؤون الإسلامية"
        },

        {
            fonction: "السيدة وزيرة الاقتصاد والمالية"
        },

        {
            fonction: "السيد وزير التجهيز والماء"
        },

        {
            fonction: "السيد وزير التربية الوطنية والتعليم الأولي والرياضة"
        },

        {
            fonction: "السيد وزير الصحة والحماية الاجتماعية"
        },

        {
            fonction: "السيدة وزيرة إعداد التراب الوطني والتعمير والإسكان وسياسة المدينة"
        },

        {
            fonction: "السيد وزير الفلاحة والصيد البحري والتنمية القروية والمياه والغابات"
        },

        {
            fonction: "السيد وزير الإدماج الاقتصادي والمقاولة الصغرى والتشغيل والكفاءات"
        },

        {
            fonction: "السيد وزير الصناعة والتجارة"
        },

        {
            fonction: "السيدة وزيرة السياحة والصناعة التقليدية والاقتصاد الاجتماعي والتضامني"
        },

        {
            fonction: "السيد وزير التعليم العالي والبحث العلمي والابتكار"
        },

        {
            fonction: "السيدة وزيرة الانتقال الطاقي والتنمية المستدامة"
        },

        {
            fonction: "السيد وزير النقل واللوجيستيك"
        },

        {
            fonction: "السيد وزير الشباب والثقافة والتواصل"
        },

        {
            fonction: "السيدة وزيرة التضامن والإدماج الاجتماعي والأسرة"
        },

        {
            fonction: "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بإدارة الدفاع الوطني"
        },

        {
            fonction: "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بالاستثمار والتقائية وتقييم السياسات العمومية"
        },

        {
            fonction: "السيد الوزير المنتدب لدى وزيرة الاقتصاد والمالية المكلف بالميزانية"
        },

        {
            fonction: "السيد الوزير المنتدب لدى رئيس الحكومة المكلف بالعلاقات مع البرلمان، الناطق الرسمي باسم الحكومة"
        },

        {
            fonction: "السيدة الوزيرة المنتدبة لدى رئيس الحكومة المكلفة بالانتقال الرقمي وإصلاح الإدارة"
        },

        {
            fonction: "السيدة كاتبة الدولة المكلفة بالصيد البحري"
        },

        {
            fonction: "السيد كاتب الدولة المكلف بالتجارة الخارجية"
        },

        {
            fonction: "السيد كاتب الدولة المكلف بالإسكان"
        },

        {
            fonction: "السيد كاتب الدولة المكلف بالشغل"
        },

        {
            fonction: "السيد كاتب الدولة المكلف بالصناعة التقليدية والاقتصاد الاجتماعي والتضامني"
        },

        {
            fonction: "السيد كاتب الدولة المكلف بالإدماج الاجتماعي"
        }

    ];


    // =================================================
    // RÉCUPÉRER LES ÉLÉMENTS HTML
    // =================================================

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


    // =================================================
    // VÉRIFICATION DES ÉLÉMENTS
    // =================================================

    if (!deputeSelect) {

        console.error(
            "L'élément #depute_id est introuvable."
        );

        return;
    }


    if (!ministreSelect) {

        console.error(
            "L'élément #ministre_id est introuvable."
        );

        return;
    }


    if (!subjectInput) {

        console.error(
            "L'élément #subject est introuvable."
        );

        return;
    }


    if (!textInput) {

        console.error(
            "L'élément #text est introuvable."
        );

        return;
    }


    if (!generateButton) {

        console.error(
            "L'élément #generateWord est introuvable."
        );

        return;
    }


    // =================================================
    // REMPLIR LA LISTE DES DÉPUTÉS
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
    // REMPLIR LA LISTE DES MINISTRES
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


    console.log(
        "Liste des députés chargée."
    );


    console.log(
        "Liste des ministres chargée."
    );


    // =================================================
    // BOUTON GÉNÉRER WORD
    // =================================================

    generateButton.addEventListener(
        "click",
        async function () {

            console.log(
                "Bouton Générer Word cliqué."
            );


            // =============================================
            // RÉCUPÉRER LES VALEURS
            // =============================================

            const subject =
                subjectInput.value.trim();


            const text =
                textInput.value.trim();


            const deputeIndex =
                deputeSelect.value;


            const ministreIndex =
                ministreSelect.value;


            // =============================================
            // VÉRIFICATIONS
            // =============================================

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


            // =============================================
            // DÉPUTÉ CHOISI
            // =============================================

            const depute =
                deputes[
                    deputeIndex
                ];


            // =============================================
            // MINISTRE CHOISI
            // =============================================

            const ministre =
                ministres[
                    ministreIndex
                ];


            const fonctionMinistre =
                ministre.fonction;


            const nomDeputeOriginal =
                depute.nom.trim();


            // =============================================
            // DÉTERMINER LA FONCTION DU DÉPUTÉ
            // =============================================

            let titreDepute;


            if (
                nomDeputeOriginal.startsWith(
                    "السيد النائب"
                )
            ) {

                titreDepute =
                    "نائب برلماني";

            }


            else if (
                nomDeputeOriginal.startsWith(
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


            // =============================================
            // SUPPRIMER LE TITRE DU NOM
            // =============================================

            const nomDepute =
                nomDeputeOriginal

                    .replace(
                        /^السيد النائب\s*/u,
                        ""
                    )

                    .replace(
                        /^السيدة النائبة\s*/u,
                        ""
                    );


            console.log(
                "Député :",
                nomDepute
            );


            console.log(
                "Fonction :",
                titreDepute
            );


            console.log(
                "Ministre choisi :",
                fonctionMinistre
            );


            // =============================================
            // RÉCUPÉRER LES OBJETS DOCX
            // =============================================

            const {

                Document,
                Packer,
                Paragraph,
                TextRun,
                AlignmentType,
                ImageRun,
                HorizontalPositionRelativeFrom,
                VerticalPositionRelativeFrom

            } = window.docx;


            // =============================================
            // CHARGER LES IMAGES
            // =============================================

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
                    "Erreur lors du chargement des images :",
                    error
                );


                alert(
                    "Impossible de charger les images.\n\n" +
                    error.message
                );


                return;
            }


            // =============================================
            // CONTENU DU DOCUMENT
            // =============================================

            const children = [];


            // =====================================================
            // IMAGE AMAZIGH - GAUCHE
            // =====================================================

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


            // =====================================================
            // IMAGE SYMBOLE - DROITE
            // =====================================================

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


            // =====================================================
            // IMAGE ROYAUME - CENTRE
            // =====================================================

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


            // =====================================================
            // PARAGRAPHE DES IMAGES
            // =====================================================

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


            // =====================================================
            // GRAND ESPACE APRÈS LES IMAGES
            // =====================================================

            children.push(

                new Paragraph({

                    spacing: {

                        before:
                            0,

                        after:
                            1400

                    },

                    children: [

                        new TextRun({

                            text:
                                ""

                        })

                    ]

                })

            );


            // =====================================================
            // DESTINATAIRE
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.CENTER,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            500

                    },

                    children: [

                        new TextRun({

                            text:
                                "السيد رئيس مجلس النواب المحترم.",

                            font:
                                "Sakkal Majalla",

                            size:
                                44,

                            bold:
                                true

                        })

                    ]

                })

            );


            // =====================================================
            // SUJET
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.JUSTIFIED,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            500,

                        line:
                            276

                    },

                    children: [

                        new TextRun({

                            text:
                                "الموضوع: سؤال كتابي حول " +
                                subject,

                            font:
                                "Sakkal Majalla",

                            size:
                                40,

                            bold:
                                true

                        })

                    ]

                })

            );


            // =====================================================
            // SALUTATION
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.CENTER,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            500,

                        line:
                            276

                    },

                    children: [

                        new TextRun({

                            text:
                                "سلام تام بوجود مولانا الإمام،",

                            font:
                                "Sakkal Majalla",

                            size:
                                44,

                            bold:
                                true

                        })

                    ]

                })

            );


            // =====================================================
            // PHRASE FIXE + MINISTRE
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.JUSTIFIED,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            500,

                        line:
                            276

                    },

                    children: [

                        new TextRun({

                            text:
                                "طبقا لمقتضيات النظام الداخلي لمجلس النواب، يشرفني أن ألتمس من سيادتكم رفع السؤال الكتابي التالي إلى " +
                                fonctionMinistre,

                            font:
                                "Sakkal Majalla",

                            size:
                                36

                        })

                    ]

                })

            );


            // =====================================================
            // TEXTE DE L'UTILISATEUR
            // =====================================================

            const lines =
                text.split(
                    /\r\n|\r|\n/
                );


            lines.forEach(
                function (line) {

                    line =
                        line.trim();


                    // =============================================
                    // LIGNE VIDE
                    // =============================================

                    if (
                        line === ""
                    ) {

                        children.push(

                            new Paragraph({

                                spacing: {

                                    after:
                                        100

                                }

                            })

                        );

                        return;
                    }


                    // =============================================
                    // LIGNE NORMALE
                    // =============================================

                    children.push(

                        new Paragraph({

                            alignment:
                                AlignmentType.JUSTIFIED,

                            bidirectional:
                                true,

                            spacing: {

                                before:
                                    0,

                                after:
                                    120,

                                line:
                                    276

                            },

                            children: [

                                new TextRun({

                                    text:
                                        line,

                                    font:
                                        "Sakkal Majalla",

                                    size:
                                        36

                                })

                            ]

                        })

                    );

                }
            );


            // =====================================================
            // FORMULE FINALE
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.CENTER,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            500,

                        after:
                            100,

                        line:
                            240

                    },

                    children: [

                        new TextRun({

                            text:
                                "وتفضلوا بقبول فائق التقدير والاحترام",

                            font:
                                "Sakkal Majalla",

                            size:
                                44,

                            bold:
                                true

                        })

                    ]

                })

            );


            // =====================================================
            // NOM DU DÉPUTÉ
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.CENTER,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            0,

                        line:
                            240

                    },

                    children: [

                        new TextRun({

                            text:
                                nomDepute,

                            font:
                                "Sakkal Majalla",

                            size:
                                44,

                            bold:
                                true

                        })

                    ]

                })

            );


            // =====================================================
            // FONCTION DU DÉPUTÉ
            // =====================================================

            children.push(

                new Paragraph({

                    alignment:
                        AlignmentType.CENTER,

                    bidirectional:
                        true,

                    spacing: {

                        before:
                            0,

                        after:
                            0,

                        line:
                            240

                    },

                    children: [

                        new TextRun({

                            text:
                                titreDepute,

                            font:
                                "Sakkal Majalla",

                            size:
                                36

                        })

                    ]

                })

            );


            // =====================================================
            // CRÉER LE DOCUMENT WORD
            // =====================================================

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


            // =====================================================
            // NOM DU FICHIER
            // =====================================================

            const fileName =
                "سؤال كتابي حول " +
                subject +
                ".docx";


            // =====================================================
            // GÉNÉRER LE FICHIER WORD
            // =====================================================

            try {

                console.log(
                    "Génération du fichier Word..."
                );


                const blob =
                    await Packer.toBlob(
                        wordDocument
                    );


                console.log(
                    "Blob Word généré :",
                    blob.size,
                    "octets"
                );


                // =================================================
                // VÉRIFIER LE TYPE DU BLOB
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
                    "Type du fichier :",
                    wordBlob.type
                );


                // =================================================
                // TÉLÉCHARGER / PARTAGER
                // =================================================

                await telechargerWord(
                    wordBlob,
                    fileName
                );


                console.log(
                    "Fichier Word généré avec succès."
                );

            }


            catch (error) {

                console.error(
                    "Erreur pendant la génération Word :",
                    error
                );


                alert(
                    "Une erreur est survenue lors de la génération du fichier Word.\n\n" +
                    error.message
                );

            }

        }
    );

}