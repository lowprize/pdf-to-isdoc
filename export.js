const fs = require('fs');
const { hasISDOC, extractISDOC, Invoice} = require('isdoc-pdf');

async function main() {
    try {  

	const nazev_pdf = process.argv[2]; // Získání názvu souboru z příkazové řádky
        const kontrola_isdoc = await fs.promises.readFile(nazev_pdf);

        const je_to_isdoc = await hasISDOC(kontrola_isdoc);
//        console.log(nazev_pdf, 'obsahuje ISDOC:', je_to_isdoc);
        
	if (!je_to_isdoc) {
            // Pokud soubor neobsahuje ISDOC, přejmenujeme ho na nazev_pdf_bez_ISDOC.pdf
            const novy_nazev = nazev_pdf.replace('.pdf', '_bez_ISDOC.pdf');
            fs.renameSync(nazev_pdf, novy_nazev);
//            console.log(`Soubor ${nazev_pdf} byl přejmenován na ${novy_nazev}`);
            return;
        }

        const export_faktury = await extractISDOC(kontrola_isdoc);
//        console.log(export_faktury);

        // Převedení faktury na XML
        const faktura_isdoc = new Invoice(export_faktury);
        const xml_faktura = faktura_isdoc.toXML();
//        console.log(xml_faktura);

        const vystupni_isdoc = nazev_pdf.replace('.pdf', '.isdoc');
        await fs.promises.writeFile(vystupni_isdoc, xml_faktura);
        console.log(`PDF exportovano do: ${vystupni_isdoc}`); 


    } catch (error) {
        console.error('Chyba cteni souboru:', error.message);
    }
}

main();
