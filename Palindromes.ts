//function ol() {
"use strict";

enum SRC {
    Start   = "Start",
    Process = "Process btn",
    Enter   = "Inp Enter",
    Click   = "Inp click",
}

const version: string = "2.34";
let elemClicked: (a: HTMLInputElement) => void; //  = null; // : () => void;
let corp: ()=>void;

let ptrim: (a:string)=>string;   // for testing browser debugger
let hitTableGL: { [s: string]: string[]; };

$(document).ready(function(): void {
//function rready(): void { // ($: JQueryStatic) => void {
//$(function() {

    const htmlFileVersion: string | undefined = $("#mv").attr('ver');  
                    // $("#html").attr('version');
    console.log("html file version: v" + htmlFileVersion);

    let locHref: string = location.href;

    const jqRedoTgt: JQuery<HTMLElement> = $('#redoTgt');
    jqRedoTgt.html(locHref); // jqRedoTgt.html() + locHref);

    //document.getElementById('redo').setAttribute('href', locHref);
    $('#redo').attr('href', locHref);

    const fileName: string = locHref.substring(locHref.lastIndexOf("/") + 1);
    const idString: string = fileName + ' js(v' + version + ') ';
    console.log(idString + 'starting. jQuery: ' + $().jquery + ", lodash: " + _.VERSION);
    let loadFromFile: boolean = false;
    
    let locText: string = locHref;
    if (locText.indexOf("http") === 0) {
        locText = locText.substring(locText.lastIndexOf("/") + 1);
    } else if (locText.indexOf("file") === 0) {
        locText = locText.substring(locText.lastIndexOf(":") + 1);
        loadFromFile = true;
    }
    $('#tt').html(locText);

    $('#h4').html("<span style='color:black;'>Palindromes " +
                "(<i><span id='c4ct'>-1</span></i>):</style>" +
                "<span style='margin: 0px 0px 0px 8px;color:navy;'>" + locText + "</span>" +
                " <span style='margin: 0px 0px 0px 8px;font-weight:normal;'>(v" +
                htmlFileVersion + ";" + version + ")</span>");
                
    const bdy: JQuery<HTMLElement> = $("#bdy");
    const defaultBodyBgColor: string = bdy.css("background-color");

    function upc4ct(): void {
        const jsC4ct: JQuery<HTMLElement> = $('#c4ct');
        jsC4ct.html((parseInt(jsC4ct.html()) + 1).toString());
    }
    upc4ct();
    
    const jqPalindromes: JQuery<HTMLElement> = $("#palindromes");
    const jqInp: JQuery<HTMLElement> = $('#inp');
    
    jqInp.click(function(): void {
        //const pin: string = <string>jqInp.val(); 
            // document.getElementById('inp').value;
        doPalindromes(SRC.Click);
    });

    //function kdf(event: KeyboardEvent): void {
 /*   jqInp.on( "keydown", function(event: KeyboardEvent): void {
            if (event.key === "Enter" || event.keyCode == 13) {           // ???
                event.preventDefault();
                //const pin: string = <string>jqInp.val();
                doPalindromes(SRC.Enter);                
            }  else {
                console.log('    keydown2: ' + event.key);
            }
    }); */
    //const node: HTMLElement = jqInp[0]; // | null = document.getElementById("inp");
    //if (node !== null) {
    //    (<HTMLElement>node).
    jqInp[0]. addEventListener("keydown", function(event: KeyboardEvent): void {     
            if (event.key === "Enter" || event.keyCode == 13) {       // ???
                event.preventDefault();
                //const pin: string = <string>jqInp.val();
                doPalindromes(SRC.Enter);
            }                       
           /*  else if (event.key === "^") {
                console.log("    ^");
                //$("#palindromes").scrollTop(100);  //  ({
                //    top: 100,
                //    left: 0,
                //    behavior: 'smooth'
                //});                 
            } */  
        });
    //} 
    //jqInp.keydown(((a:KeyboardEvent)=>null)kdf);
    
    const jqGrl: JQuery<HTMLElement> = $("#grl");
    jqInp[0].addEventListener("keyup", function(event: KeyboardEvent): void {
         event.preventDefault();
         jqGrl.html((<string>jqInp.val()).length.toString());
    });
    
    corp = function() {
         jqGrl.html("?");
    };
   
    elemClicked = function(elem: HTMLInputElement): void {
        let s: string = "UNKNOWN SOURCE";
        if (elem.id === "doit") {
            let t: string = elem.innerHTML;
            const maxLen: number = 15;
            if (t.length > maxLen) {
                t = t.substring(0,maxLen) + "...";
            }
            s = "innerHTML: '" + t + "'";
        } else if (elem.id === "ck") {
            s = "checked: " + elem.checked;
        //}
        //console.log("  -- elemClicked: id: '" + elem.id + "', " + s);
        //if (elem.id === "ck") {
            const ckt: JQuery<HTMLElement> = $("#ckt");
            //const bdy: JQuery<HTMLElement> = $("#bdy");
            if (elem.checked) {
                ckt.html("Checked");
                bdy.css("background", "AntiqueWhite");
            } else {
                ckt.html("Unchecked");
                bdy.css("background", defaultBodyBgColor);
            }
        }
        //const pin: string = <string>jqInp.val();
        doPalindromes(SRC.Process);
        //console.log($("#TR4"));                     // removal works
        //$("#TR4").remove();
    }
    
    //let prevTrimmedString: string = "0";

    function doPalindromes(source: SRC): void {
    
        function palinTrim(pin: string): string {
            const mf: string = _.replace(pin, /[^a-zA-Z]/g, ''); // pin.replace(/[^a-zA-Z]/g, '');
            //if (mf === prevTrimmedString) {
            //    //console.log("        no change");
            //    return "0";
            //}
            //prevTrimmedString = mf;
            
            const mfpjs: JQuery<HTMLElement> = $("#mfp");
            const mfjs: JQuery<HTMLElement> = $("#modifiedString");
            if (mf === pin || mf.length < 1) {
                mfpjs.hide();
            } else {
                mfpjs.show()
                mfjs.html(mf);
                $("#stl").html(mf.length.toString());
            }
            upc4ct();
            return mf;
        }   
        ptrim = palinTrim;   // for testing browser debugger
    
        //function findM(sx: string, ix: number, hitTable: { [s: string]: string[]; }): void {
        function findM(sx: string, ix: number):void {
            function addToTable(ix: number, span: number, hit: string ): void {
                const startp: string = "P" + (ix - span).toString();
                if (hitTable[startp] === undefined) {
                    hitTable[startp] = [];
                }
                hitTable[startp].push(hit);
            }
            const len: number = sx.length;
            const s: string = sx.toLowerCase();
            let span: number = 1;
            // aba type paliondromes
            while (ix - span >= 0 && ix + span <= len) {
                if (s.charAt(ix - span) !== s.charAt(ix + span)) {        // , 1
                    break;
                }
                const hit: string = sx.substring(ix - span, ix + span + 1);
                addToTable(ix, span, hit);
                span += 1;
            }
            span = 0;
            // abba (or just bb) type palimdromes
            while (ix - span >= 0 && ix + span <= len - 1) {
                if (s.charAt(ix - span) !== s.charAt(ix + span + 1)) {    // , 1
                    break;
                }
                const hit: string = sx.substring(ix - span, ix + span + 2);
                addToTable(ix, span, hit);
                span += 1;
            }
        }
        
        // (always process the string in input field)
        //const testStringOrig: string = <string>jqInp.val(); 
        const testString: string = palinTrim(<string>jqInp.val());
        //const jqPalindromes: JQuery<HTMLElement> = $("#palindromes");
        //if (testString === "0") {
        //    return;
        //}
        const tsl: number = testString.length;
        if (tsl < 2) {
            jqPalindromes.html("[ Input too short (len: " + tsl + ") to form palindromes ]");
            $("#ttl").html("<span style='font-weight: Bold;'>0</span> <i>in</i> " + tsl );
            return;
        }
        const hitTable: { [s: string]: string[]; } = {};
        hitTableGL = hitTable;
        //for (let i = 0; i < tsl - 1; ++i) {
        for (let i of _.range(0,tsl - 1)) {
            findM(testString, i); // , hitTable);
        }

        const ruler: string = "0....5....10...15...20...25...30...35...40...45...50...".
                                      substring(0, Math.floor((tsl-1)/5) * 5 + 5);
        console.log("'" + testString + "' (" + tsl + ", " + source + ")" + "\n " + ruler);

        let hlist: string = ""; //  <table style='font-size:14px;border-spacing: 0px; border: 1px solid red;'>";
        let totp: number = 0;
        for (let i of _.range(0,tsl)) { //  = 0; i < tsl ; ++i) {
            const ixs: string = i.toString();
            hlist += "<tr id='TR" + ixs + "'><td style='text-align: right; vertical-align:top;'>" + ixs + 
                    "<span style='font-family: monospace;margin: 0px 2px 0px 0px;'>.</span></td>" + 
                     "<td class='cat' style='font-family: monospace;vertical-align:top;'>" +
                         "<span style='margin: 0px 16px 0px 8px;font-weight:bold; color:navy;'>" +
                         testString.charAt(i) + "</span></td>";
            let hitsFormatted: string = "";
            const hits: string[] = hitTable["P" + ixs];
            if (hits !== undefined) {
                //hits.forEach((item, ix) => {hitsFormatted += (ix > 0 ?', ' : '') + item} );
                _.forEach(hits, (item, ix) => {
                    totp++;
                    hitsFormatted += (ix > 0 ?', ' : '') + 
                        "<span class='item' id='I_" + ixs + "_" + ix  + "'" +
                            " style='padding:1px 0px 1px 0px;'>" + item + "</span>";
                });
            }
            hlist += "<td><span style='margin: 0px 0px 0px 3px;'></span></td>" +
                    "<td style='font-family: monospace;'><span style='padding: 0px;'>" + hitsFormatted + 
                        "</span></td></tr>";
        }
        $("#ttl").html("<span style='font-weight: Bold;'>" + totp + "</span> <i>in</i> " + tsl);
        if (hlist.length === 0) {
            jqPalindromes.html("[ No palindromes found ]");
            return;
        }
        hlist = "<table style='font-size:14px;border-spacing: 0px;'>" + hlist + "</table>";
        jqPalindromes.html(hlist);
    }

    //const testString = "abbbbcdefakaakaghijakalmdcncddcnooo";
    const startString: string =  " R radar, radarR   thisis^";
    //document.getElementById("inp").value = startString;
    jqInp.attr("value", startString);
    jqGrl.html(startString.length.toString());
    doPalindromes(SRC.Start);
    
    console.log(jqPalindromes);
    
 /*   function loadDoc(locToGetFrom: string) {
        //var xhttp: XMLHttpRequest = new XMLHttpRequest();
        //xhttp.onreadystatechange = function() {
        //    if (this.readyState == 4 && this.status == 200) {
        //        $("#demo").html(this.responseText);
        //    }
        //};
    //
        //xhttp.open("GET", locToGetFrom, true);
        //xhttp.send(); 
        
        $.ajax({
            url: locToGetFrom,
            type: 'GET',
            success: function(res) {
                $("#demo").html("Ajax read: '" + res + "'");
            },
            error: function(res) {
                $("#demo").html("[ Failed Ajax get: " + res.statusText + " ]");
            } 
        });
    }
    loadDoc((loadFromFile ? "http://localhost:8080/" : "") + "ajax_info.txt"); */
    
  /*  if (!loadFromFile) {
        loadDoc("ajax_info.txt");
    } else {
        try {
            //loadDoc("http://localhost:8080/ajax_info.txt");
            $.ajax({
                 url: "http://localhost:8080/ajax_info.txt",
                 type: 'GET',
                 success: function(res) {
                     $("#demo").html("File Ajax localhost read: '" + res + "'");
                 },
                 error: function(res) {
                     $("#demo").html("[ Failed Ajax get: " + res.statusText + " ]");
                 } 
           });
        } catch (iex) {
            console.log("caught");
            $("#demo").html("[ Ajax error caught iex: " + iex + " ]");
            console.log("iex? " + iex);
        }
    }  */
    
    let prevHilited: JQuery<HTMLElement>;
    let prevHilitedIx: number = -1;
    let prevHilitedCt = -1;
    const hiliteColor: string = "Yellow";
    
    jqPalindromes.on( "click", ".item", function(evt) {          // "span" ----
        if (prevHilited !== undefined) {
            prevHilited.css({"background": "", "font-weight":"normal"});
            //prevHilited.parent().parent().children().eq(1).css("background", "");
            for (let trC: number = prevHilitedIx; trC < prevHilitedIx + prevHilitedCt; ++trC) {
                //$("#TR" + trC).children().eq(1).css("background", "");
                $("#TR" + trC).children(".cat").css("background", "");
            }
        }
        const thisP: JQuery<HTMLElement> = $(this);
        const thisId: string = <string>thisP.attr("id");
        //const sary: string[] = thisId.split("_");
        const [s1, s2, s3] = thisId.split("_");
        //console.log("s2 type: " + typeof s2);
        //console.log("POC: " + s2 + " " + s3 + ". '" + thisP.html() + "'");
        const slen: number = thisP.html().length;
        const intS2: number = parseInt(s2);
        for (let trC: number = intS2; trC < intS2 + slen; ++trC) {
            $("#TR" + trC).children(".cat").css("background", hiliteColor);
        }
        $("#" + thisId).css({"background": hiliteColor, "font-weight" : "bold"});
        prevHilited = thisP;
        prevHilitedIx = intS2
        prevHilitedCt = slen;  
    });

    //console.log(this === window);
    console.log(idString + 'ending.');
});

//$(document).ready(<($: JQueryStatic) => void><unknown>rready());

