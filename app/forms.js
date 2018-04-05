//////////////////////////////////////////////////////////////////
////////////   Form manager Directseo  & AZ Project /////////////
////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
/// key value is important and ex. used to generate select list 
/////////////////////////////////////////////////////////////////////////

var forms = {
    "PracownicyCtrlCtrl":{
        "pracownik":{
            "label":"Pracownik",
            "required":"true",
            "placholder":"Wprowadz nazwe uzytkownika",
            "type":"input",
            "scope":"pracownik"
        },
        "tel":{
            "label":"Tel. kontaktowy",
            "required":"true",
            "placholder":"Wprowadz numer telefonu",
            "type":"input",
            "scope":"tel"
        },
        "maszyna":{
            "label":"Nr rej. maszyny",
            "required":"true",
            "placholder":"Wprowadz nr rej. maszyny ",
            "type":"input",
            "scope":"maszyna"
        },
        "login":{
            "label":"Login",
            "required":"true",
            "placholder":"Wprowadz Login ",
            "type":"input",
            "scope":"login"
        }
        ,
        "haslo":{
            "label":"Hasło ",
            "required":"true",
            "placholder":"Wprowadz Hasło ",
            "type":"input",
            "scope":"haslo"
        },

        "status":{
            "label":"status ",
            "required":false,
            "placholder":"Wprowadz Hasło ",
            "type":"checkbox",
            "scope":"status"
        },

    },
    "ProduktyCtrl":{
        "produkt":{
            "label":"Nazwa Produktu ",
            "required":"true",
            "placholder":"Wprowadz nazwę produktu ",
            "type":"input",
            "scope":"produkt"
        },
        "status":{
            "label":"Dostępny ",
            "required":false,
            "placholder":"Wprowadz Hasło ",
            "type":"checkbox",
            "scope":"status"
        },
    },
    "MiejscaCtrl":{
        "miejsce":{
            "label":"Miejsce ",
            "required":"true",
            "placholder":"Wprowadz nazwę miejsca",
            "type":"input",
            "scope":"miejsce"
        },
        "skad":{
            "label":"Skąd",
            "required":false,
            "placholder":"Wprowadz Hasło ",
            "type":"radio",
            "value":"skad",
            "scope":"status"
        },
        "dokad":{
            "label":"Dokąd ",
            "required":false,
            "placholder":"Wprowadz Hasło ",
            "type":"radio",
            
            "value":"dokad",
            "scope":"status"
        },
    },
    "firmyCtrl":{
        "firma":{
            "label":"Nazwa firmy ",
            "required":"true",
            "placholder":"Wprowadz nazwę firmy ",
            "type":"input",
            "scope":"firma"
        },
        "status":{
            "label":"Dostępny ",
            "required":false,
            "placholder":"Wprowadz Hasło ",
            "type":"checkbox",
            "scope":"status"
        },
    },

    "kursCtrl":{
        "ladunek":{
            "label":"Ładunek ",
            "required":true,
            "placholder":"Wprowadz nazwę ladunku ",
            "type":"select",
            "scope":"ladunek",
            "show_val":"produkt"  //for ng-repaet value show
            
        },
        "ilosc":{
            "label":"Ilosc [tony] ",
            "required":true,
            "placholder":"Wprowadz ilosc w tonach ",
            "type":"number",
            "scope":"ilosc"
        },
        "miejsca_skad":{
            "label":"Skad [Załadunek] ",
            "required":true,
            "placholder":"Wprowadz ilosc w tonach ",
            "type":"select",
            "scope":"miejsce_skad",
            "show_val":"miejsce" //for ng-repaet
        },

        "miejsca_dokad":{
            "label":"Dokąd [rozładunek] ",
            "required":true,
            "placholder":"Wprowadz ilosc w tonach ",
            "type":"select",
            "scope":"miejsce_dokad",
            "show_val":"miejsce" //for ng-repaet
        },
        "firmy":{
            "label":"Firma odbierająca",
            "required":true,
            "type":"select",
            "scope":"firma",
            "show_val":"firma" //for ng-repaet
        },
        "podpis":{
            "label":"Podpis ",
            "required":false,
            "placholder":"Wprowadz ilosc w tonach ",
            "type":"signature",
            "scope":"status"
        },
    },
}