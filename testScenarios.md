# Testovacie scenáre

## 1. Prihlásenie

Akcia: Používateľ pri vstupe na stránku zadá svoje prihlasovacie meno a heslo.

Reakcia: Skontroluje sa, či daný používateľ existuje. Ak existuje, overí sa, či bolo zadané správne heslo. Ak bolo zadané správne heslo, zobrazí sa stránka objednávania klientov. Pri nesprávnom hesle sa zobrazí oznámenie o tom, že heslo a meno používateľa nie sú správne.

## 2. Vyhľadanie klienta - vytváranie objednávky

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ na stránke vytvárania objednávok zadá informáciu o klientovi(meno/priezvisko/telefón) a klikne na klienta, s ktorým chce pracovať.

Reakcia: Klient sa uloží do premennej(frontend) a je s ním možné ďalej pracovať.

## 3. Vyhľadanie klienta - administrácia klientov

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ na stránke administrácie klientov zadá informáciu o klientovi(meno/priezvisko/telefón) a klikne na klienta, s ktorým chce pracovať.

Reakcia: Klient sa uloží do premennej(frontend) a je s ním možné ďalej pracovať.

## 4. Pridanie klienta

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ na stránke administrácie klientov vyplní informácie o klientovi zvolí pridať klienta.

Reakcia: Klient sa uloží do databázy a pri kroku 2 a 3 ho je možné vyhľadať.

## 5. Odstránenie klienta

Kroky ktoré sa vykonajú predtým: 1, 3

Akcia: Používateľ zvolí odstrániť klienta. 

Reakcia: Klient sa odstráni z databázy a pri kroku 2 a 3 ho nie je možné vyhľadať.

## 6. Príznaky o aktívnosti klienta, GDPR a rekreačnej karty

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ zmení stav príznakov o aktívnosti klienta alebo GDPR alebo rekreačnej karty buď pri pridaní klienta alebo pri aktualizovaní údajov o klientovi.

Reakcia: Klient má aktualizované informácie a je to možné overiť cez krok 3.

## 7. Editovanie klientov

Kroky ktoré sa vykonajú predtým: 1, 3

Akcia: Používateľ zmení údaje o klientovi a zvolí aktualizovať údaje o klientovi.

Reakcia: Klient má aktualizované informácie a je to možné overiť cez krok 3.







