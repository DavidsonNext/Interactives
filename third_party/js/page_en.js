// Javascript f�r HTML5-Apps (englisch)
// 13.08.2014 - 15.09.2014

// Konstanten:

var language = "en";                                                         // Abk�rzung f�r Sprache
var textPhysics = "Physics";                                                 // Bezeichnung f�r Physik
var textCollection = "Physics Apps";                                         // Bezeichnung f�r Programmsammlung
var textModification = "Last modification";                                  // Bezeichnung f�r letzte �nderung

// Array der Monatsnamen:

var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Logo Physik-Apps:

function logo (filename) {
  var body = document.getElementsByTagName("body")[0];                       // Body-Element
  var t = document.createElement("table");                                   // Neue Tabelle
  t.setAttribute("class","Index");                                           // Klasse (Layout-Festlegung durch CSS-Datei)
  t.setAttribute("align","center");                                          // Ausrichtung zentriert
  var tr = document.createElement("tr");                                     // Neue Tabellenzeile
  t.appendChild(tr);                                                         // Tabellenzeile hinzuf�gen
  var td = document.createElement("td");                                     // Neue Tabellenzelle
  td.setAttribute("class","Index1");                                         // Klasse (Layout-Festlegung durch CSS-Datei)
  var a = document.createElement("a");                                       // Neuer Link
  a.setAttribute("href","http://www.walter-fendt.de/html5/phen/index.html"); // Adresse f�r Inhaltsverzeichnis
  var i = document.createElement("img");                                     // Neues Bild (Logo Physik)
  i.setAttribute("src","img/javaphys.gif");                                  // Pfadangabe
  i.setAttribute("alt",textPhysics);                                         // Alternativer Text
  i.setAttribute("style","margin-left: 10px; margin-right: 10px;");          // Seitenabstand
  a.appendChild(i);                                                          // Bild zum Link hinzuf�gen
  td.appendChild(a);                                                         // Link zur Tabellenzelle hinzuf�gen
  tr.appendChild(td);                                                        // Tabellenzelle zur Tabellenzeile hinzuf�gen
  tr = document.createElement("tr");                                         // Neue Tabellenzeile
  td = document.createElement("td");                                         // Neue Tabellenzelle
  td.setAttribute("class","Index2");                                         // Klasse (Layout-Festlegung durch CSS-Datei)
  a = document.createElement("a");                                           // Neuer Link
  a.setAttribute("href","http://www.walter-fendt.de/html5/phen/index.html"); // Adresse f�r Inhaltsverzeichnis
  a.innerHTML = textCollection;                                              // Bezeichnung f�r Programmsammlung
  td.appendChild(a);                                                         // Link zur Tabellenzelle hinzuf�gen
  tr.appendChild(td);                                                        // Tabellenzelle zur Tabellenzeile hinzuf�gen
  t.appendChild(tr);                                                         // Tabellenzeile hinzuf�gen
  body.appendChild(t);                                                       // Tabelle hinzuf�gen
  }
  
// Datum nach dem Muster "January 1, 2000"
// d ... Tag (1 bis 31)
// m ... Monat (1 bis 12)
// y ... Jahr
  
function date (d, m, y) {
  return month[m-1]+" "+d+", "+y;
  }
  
// Daten am Ende der Seite (URL, Copyright, letzte �nderung)

function data (filename, d1, m1, y1, d2, m2, y2) {
  var body = document.getElementsByTagName("body")[0];               // Body-Element
  var p = document.createElement("p");                               // Neuer Absatz
  p.setAttribute("class","Ende");                                    // Klasse (Layout-Festlegung durch CSS-Datei)
  var s = "URL: http://www.walter-fendt.de/html5/ph"+language+"/";   // Anfang der URL
  s += filename+"_"+language+".htm<br>";                             // URL vervollst�ndigen, Zeilenumbruch
  s += "\u00a9  Walter Fendt, "+date(d1,m1,y1)+"<br>";               // Copyright-Vermerk mit Datum, Zeilenumbruch
  s += textModification+": "+date(d2,m2,y2);                         // Datum der letzten �nderung
  p.innerHTML = s;                                                   // Inhalt des Absatzes
  body.appendChild(p);                                               // Absatz hinzuf�gen
  }
  
// Leere Zeile 
  
function emptyLine () {
  var e = document.createElement("div");                             // Neues Div-Element
  e.setAttribute("class","Abstand");                                 // Klasse (Layout-Festlegung durch CSS-Datei)
  e.innerHTML = "\u0020";                                            // Leerzeichen
  return e;                                                          // R�ckgabewert
  }
  
// Seitenende insgesamt
// filename ..... Dateiname (ohne Erweiterungen)
// d1, m1, y1 ... Datum der Erstver�ffentlichung
// d2, m2, y2 ... Datum der letzten �nderung

function endPage (filename, d1, m1, y1, d2, m2, y2) {
  var body = document.getElementsByTagName("body")[0];               // Body-Element
  body.appendChild(emptyLine());                                     // Leere Zeile hinzuf�gen
  var hr = document.createElement("hr");                             // Trennstrich
  hr.setAttribute("class","Trennlinie");                             // Klasse (Layout-Festlegung durch CSS-Datei)
  body.appendChild(hr);                                              // Trennstrich hinzuf�gen
  body.appendChild(emptyLine());                                     // Leere Zeile hinzuf�gen
  logo(filename);                                                    // Logo
  data(filename,d1,m1,y1,d2,m2,y2);                                  // Daten am Ende (URL, Copyright, letzte �nderung)
  }
  
  
  
