[TOC]

# 1. Katalóg požiadaviek

## 1.1 Úvod

### 1.1.1 Účel dokumentu
Tento dokument slúži na opísanie požiadaviek ku projektu Rezervačný systém pre fitness centrum. Obsahuje požiadavky zadávateľa, školiteľa a je záväzný pre zadávateľa a realizátorov projektu.

### 1.1.2 Rozsah využitia systému
Účelom aplikácie je riešiť rezerváciu klientov fitness centra, pričom aplikácia má ponúkať možnosť ukladania rozličných informácii o klientoch, strojoch a procedúrach vo fitness centre. Aplikáciu bude určená len pre zamestnancov fitness centra, aby za jej pomoci mohli ponúkať služby fitness centra efektívnejšie.

### 1.1.3 Slovník pojmov
- okno času = 45 minút
- aktivita = stroj alebo procedúra na ktorú sa da objednať

### 1.1.4 Odkazy a referencie

#### Dokumentácia k React
https://reactjs.org/docs/getting-started.html

#### Dokumentácia k Laravel
https://laravel.com/docs/6.x

### 1.1.5 Prehľad nasledujúcich kapitol
V ďalších kapitolách sa čitateľ môže dozvedieť o tom, pre koho je aplikácia určená, konkrétnych atomických požiadavkách, ktoré bude spĺňať finálna verzia aplikácie.

## 1.2 Všeobecný popis

### 1.2.1 Perspektíva systému
Aplikácia bude slúžiť hlavne na objednávku klientov fitness centra na rôzne stroje a procedúry. Okrem tejto funkcionality bude ukladať informácie o klientoch a o procedúrach. Používateľ aplikácie bude mať možnosť tieto informácie aj meniť. Zároveň bude aplikácia ponúkať veľmi základné štatistiky o návštevnosti.

### 1.2.2 Funkcie systému
Aplikácia sa bude pripájať k databáze, z ktorej bude získavať informácie o klienoch, strojoch, objednávkach a bude túto databázu aktualizovať. Pri aktualizáciach bude upravovať informácie o klientoch, ktorých bude môcť pridávať a odstraňovať a rovnako bude môcť pracovať aj s informáciami o strojoch a objednávkach. Prístup k jednotlivým funkciám je znázornený na nasledovnom obrázku.
![wireframe concept](wireframe.jpg)

### 1.2.3 Charakteristika používateľa
V aplikácii bude len jeden typ používateľa. Tento používateľ teda bude môcť využivať všetky funkcie aplikácie.
Aplikácie je určená pre zamestnanca fitness centra, ktorý eviduje objednávky zákazníkov a vyťaženosť fitness centra.

### 1.2.4 Všeobecné obmedzenia
Aplikáciu bude môžné spúšťať len cez webový prehliadač. Podmienky pre minimálne verzie prehliadačov sú nasledovné:
- Google Chrome 49+
- Mozilla Firefox 46+
- Microsoft Edge 13+
- Apple Safari 8+
- Opera 27+

### 1.2.5 Predpoklady a závislosti
Systém bude závislí na databáze, z ktorej bude získavať údaje o klientoch, strojoch, procedúrach a objednávkach.

## 1.3 Špecifické požiadavky

### 1.3.1 Funkčné požiadavky

#### R01 Možnosť vyhľadávať v klientoch
Rýchle vyhľadávanie klientov v databáze podľa mena, priezviska alebo telefónneho čísla.

#### R02 Pridávanie klientov
Pridávanie klientov, ktorý sa budú môcť následne dať nastaviť ako objednávatelia aktivít a vyhľadávať v systéme.

#### R03 Odstraňovanie klientov
Vymazanie klientov z databázy. Nastavenie príznaku ku klientovi, že je neaktívny/aktívny.

#### R04 Editovanie klientov
Zmena údajov klientov (meno, priezvisko, telefónne číslo).

#### R05 Možnosť rezervácie aktivít pre klienta v danom čase

#### R06 Pridávanie poznámok do objednávky aktivity
Každá objednávka ma klienta, aktivitu a ešte sa k nej da pridať poznámka.

#### R07 Rýchli prístup k dnešnému dňu v kalendári
Umožniť rýchly prístup k dnešnému dňu na kalendári, aj keď sa administrátor nachádza ľubovoľnej časti kalendára.

#### R08 Pridávanie klienta na viacero aktivít
Ak si vyhľadáme klienta na pridanie do aktivít, tak môžeme mu zaradiť viacero časových okien aj viacero aktivít bez nutnosti opätovného vyhľadávania používateľa.

#### R09 Editovanie objednávok aktivít
Možno zmeniť klienta, pridať poznámku alebo zmeniť aktivitu na dané okno.

#### R10 Odstraňovanie objednávok aktivít

#### R11 Prezeranie histórie objednávok pre používateľa

#### R12 Prezeranie histórie objednávok pre aktivitu

### 1.3.2 Požiadavky nevzťahujúce sa na funkcionalitu
Systém bude dodaný ako webová aplikácia, ktorá sa bude spúšťať cez jeden z podporovaných webových prehliadačov, ktoré sú vyššie uvedené.

### 1.3.3 Požiadavky rozhrania


Aplikácia bude interagovať s používateľom cez webový prehliadač.
