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

## 8. Vytvorenie rezervácie

Kroky ktoré sa vykonajú predtým: 1, 2

Akcia: Používateľ vyberie časové okno a vyplní dodatočné údaje k rezervácií. Následne potvrdí vytvorenie rezervácie.

Reakcia: Klient má vytvorenú rezerváciu. Táto rezervácia sa zobrazuje po prihlásení v danom časovom okne.

## 9. Prístup k dnešnému dňu v kalendári

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ prejde na vzdialený dátum niekedy v budúcnosti. Následne klikne na presunutie sa k dnešnému dňu.

Reakcia: Klient je presmerovaný v kalendári na dnešný deň.

## 10. Vytvorenie rezervácie klientovi na viacero aktivít

Kroky ktoré sa vykonajú predtým: 8

Akcia: Používateľ vyberie časové okno a vyplní dodatočné údaje k rezervácií. Následne potvrdí vytvorenie rezervácie. Tento krok je potrebné spraviť hneď po kroku 8, čiže rezervácia je vytváraná rovnakému klientov, ako v kroku 8.

Reakcia: Klient má vytvorenú rezerváciu. Táto rezervácia sa zobrazuje po prihlásení v danom časovom okne.

## 11. Editovanie objednávky

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ vyberie časové okno, na ktoré je vytvorená rezervácia a upraví informácie o rezervácií. Následne zmenu potvrdí.

Reakcia: Rezervácia je zmenená. Táto zmena sa zobrazuje po prihlásení v danom časovom okne.

## 12. Odstránenie objednávky

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ vyberie časové okno, na ktoré je vytvorená rezervácia a odstráni ju.

Reakcia: Rezervácia je odstránená. Táto zmena sa zobrazuje po prihlásení v danom časovom okne.

## 13. Prezeranie histórie objednávok pre klientov

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ v menu klikne na položku História objednávok a určí, že chce prezerať históriu pre klientov.

Reakcia: Používateľovi sa zobrazí história objednávok pre všetkých klientov.

## 14. Prezeranie histórie objednávok pre klienta

Kroky ktoré sa vykonajú predtým: 13

Akcia: Používateľ vyhľadá klienta.

Reakcia: Používateľovi sa zobrazí história objednávok pre klienta, ktorého vybral.

## 15. Prezeranie histórie objednávok pre aktivity

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ v menu klikne na položku História objednávok a určí, že chce prezerať históriu pre aktivity.

Reakcia: Používateľovi sa zobrazí história objednávok pre všetky aktivity.

## 16. Prezeranie histórie objednávok pre aktivitu

Kroky ktoré sa vykonajú predtým: 15

Akcia: Používateľ vyhľadá aktivity.

Reakcia: Používateľovi sa zobrazí história objednávok pre aktivitu, ktorú vybral.

## 17. Pridanie aktivity

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ na stránke administrácie aktivít vyplní informácie o aktivite zvolí pridať aktivitu.

Reakcia: Aktivita sa uloží do databázy a je možné na ňu vytvárať objednávky.

## 18. Odstránenie aktivity

Kroky ktoré sa vykonajú predtým: 1

Akcia: Používateľ na stránke administrácie aktivít vyhľadá aktivitu a zvolí možnosť odstrániť ju.

Reakcia: Aktivita sa odstráni z databázy a už nie je možné na ňu vytvárať objednávky.

## 18. Prezeranie obsadenosti

Akcia: Klient prejde na stránku prezerania obsadenosti aktivít.

Reakcia: Klientovi sa zobrazí kalendár s obsadenosťou časových okien.