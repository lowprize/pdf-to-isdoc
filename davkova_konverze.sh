#!/bin/bash

# Nastavte cestu k adresáři, ve kterém se nachází PDF soubory
cesta="/mnt/"

# Projdeme všechny soubory v adresáři

for soubor in "$cesta"/*; do
    # Pokud je soubor PDF nebo ISDOC, spustíme příkaz "node prevod.js"
    if [[ "$soubor" == *.pdf || "$soubor" == *.PDF ]]; then
        node prevod.js "$soubor"
#	echo $soubor
    fi
done
