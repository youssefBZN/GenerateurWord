function construirePDFContainer(
    subject,
    text,
    fonctionMinistre,
    nomDepute,
    titreDepute
) {

    const pdfContainer =
        document.createElement(
            "div"
        );


    pdfContainer.style.position =
        "absolute";


    pdfContainer.style.left =
        "-100000px";


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
        "-1";


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


        img.style.display =
            "block";


        if (
            position === "left"
        ) {

            img.style.left =
                "0";

        }

        else if (
            position === "right"
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
                true

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
            .map(function (line) {

                return line.trim();

            })
            .filter(function (line) {

                return line !== "";

            });


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


    document.body.appendChild(
        pdfContainer
    );


    return pdfContainer;

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

    const {
        jsPDF
    } =
        window.jspdf;


    const mobile =
        estAppareilMobile();


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
        // CANVAS COMPLET
        // =================================================

        const largeur =
            pdfContainer.scrollWidth;


        const hauteur =
            pdfContainer.scrollHeight;


        console.log(
            "Largeur PDF :",
            largeur
        );


        console.log(
            "Hauteur PDF :",
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


        const canvasComplet =
            await window.html2canvas(
                pdfContainer,
                {

                    scale:
                        mobile
                            ? 1
                            : 1.5,

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


        if (
            !canvasComplet ||
            canvasComplet.width === 0 ||
            canvasComplet.height === 0
        ) {

            throw new Error(
                "html2canvas n'a pas réussi à créer le document."
            );

        }


        console.log(
            "Canvas créé :",
            canvasComplet.width,
            "x",
            canvasComplet.height
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


        const largeurPDF =
            210;


        const hauteurPDF =
            297;


        const largeurContenu =
            largeurPDF -
            margin * 2;


        const hauteurContenu =
            hauteurPDF -
            margin * 2;


        // largeur canvas -> largeur PDF
        const ratio =
            canvasComplet.width /
            largeurContenu;


        // hauteur d'une page en pixels canvas
        const hauteurPageCanvas =
            Math.floor(
                hauteurContenu *
                ratio
            );


        let positionY =
            0;


        let page =
            0;


        // =================================================
        // DÉCOUPAGE EN PAGES
        // =================================================

        while (
            positionY <
            canvasComplet.height
        ) {

            page++;


            const hauteurRestante =
                canvasComplet.height -
                positionY;


            const hauteurCettePage =
                Math.min(
                    hauteurPageCanvas,
                    hauteurRestante
                );


            const pageCanvas =
                document.createElement(
                    "canvas"
                );


            pageCanvas.width =
                canvasComplet.width;


            pageCanvas.height =
                hauteurCettePage;


            const ctx =
                pageCanvas.getContext(
                    "2d"
                );


            ctx.fillStyle =
                "#ffffff";


            ctx.fillRect(
                0,
                0,
                pageCanvas.width,
                pageCanvas.height
            );


            ctx.drawImage(

                canvasComplet,

                0,
                positionY,

                canvasComplet.width,
                hauteurCettePage,

                0,
                0,

                canvasComplet.width,
                hauteurCettePage

            );


            const imageData =
                pageCanvas.toDataURL(
                    "image/jpeg",
                    mobile
                        ? 0.85
                        : 0.95
                );


            if (
                page > 1
            ) {

                pdf.addPage();

            }


            const hauteurImagePDF =
                hauteurCettePage /
                ratio;


            pdf.addImage(

                imageData,

                "JPEG",

                margin,

                margin,

                largeurContenu,

                hauteurImagePDF,

                undefined,

                "FAST"

            );


            positionY +=
                hauteurCettePage;


            // Libérer le canvas
            pageCanvas.width =
                1;


            pageCanvas.height =
                1;


            if (
                mobile
            ) {

                await new Promise(
                    function (
                        resolve
                    ) {

                        setTimeout(
                            resolve,
                            30
                        );

                    }
                );

            }

        }


        // =================================================
        // BLOB PDF
        // =================================================

        const blob =
            pdf.output(
                "blob"
            );


        if (
            !blob ||
            blob.size === 0
        ) {

            throw new Error(
                "Le PDF généré est vide."
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
            "PDF généré :",
            pdfBlob.size,
            "octets"
        );


        return pdfBlob;

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
