let niz = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
	brojNeslozenihPolja = niz.length,
	brojPoteza = 0,
	imeIgraca = "";

function napraviTablu() {
	for (let i = 0; i < niz.length; i++) {
		if (niz[i] != 0) {
			$("#container").append('<div class="polje" onclick="pomeriElement(' + i + ')">' + niz[i] + '</div>');
		} else {
			$("#container").append('<div class="polje-prazno">' + niz[i] + '</div>'); // samo vrednost 0 ima belu pozadinu
		}
	}
}

function izmesajNiz() {
	// niz = niz.sort(function(a, b){return 0.5 - Math.random()}); resenje u jednoj liniji, ali ne daje tako dobar rezultat nasumicnog generisanja
	for (let i = niz.length - 1; i > 0; i--) {
		let nasumicniBroj = Math.floor(Math.random() * (i + 1));
		tmp = niz[i];
		niz[i] = niz[nasumicniBroj];
		niz[nasumicniBroj] = tmp;
	}
}

// cisti div kako bi mogao da prikaze novu tablu
function ocistiTablu() {
	$("#container").empty();
}

// premesta polje u prazno polje
function pomeriElement(a) {
	if (niz[a-4] === 0) {
		priv = niz[a-4];
		niz[a-4] = niz[a];
		niz[a] = priv;
	} else if (niz[a+4] === 0) {
		priv = niz[a+4];
		niz[a+4] = niz[a];
		niz[a] = priv;
	} else if (niz[a-1] === 0) {
		priv = niz[a-1];
		niz[a-1] = niz[a];
		niz[a] = priv;
	} else if (niz[a+1] === 0) {
		priv = niz[a+1];
		niz[a+1] = niz[a];
		niz[a] = priv;
	}
	brojPoteza++;
	ocistiTablu();
	napraviTablu();
	proveriRasporedElemenata();
	return(niz);
}

function unosImena() {
	imeIgraca = $("#ime").val();
	if (imeIgraca === "") {
		alert("Molimo unesite ime");
	} else {
		$("#unosImena").css("display", "none");
		$("main").css("display", "flex");
		napraviTablu();
		$("#container").css("pointer-events", "none");
		return imeIgraca;
	}
}

// provera da li su elementi slagalice poredjani po redu
function proveriRasporedElemenata() {
	for (i = 0; i < niz.length; i++) {
		if (niz[i] === i) {	
			brojNeslozenihPolja--;
			if (brojNeslozenihPolja === 0) {
				$("main").css({
					"opacity" : "0.3",
					"pointer-events" : "none"
				});
				$("#unosImena").css({
					"display" : "flex",
					"user-select" : "none",
					"cursor" : "pointer"
				});
				$("#unosImena").html("Bravo " + imeIgraca + ", završili ste igru u " + brojPoteza + " poteza <br> (kliknite na ovaj prozor da generišete novu tablu)");
				$("#unosImena").click(function() {
					$("#unosImena").css("display", "none");
					$("main").css({
						"opacity" : "1",
						"pointer-events" : "auto",
						"cursor" : "pointer"
					});
					novaIgra();
				});
			}
		} else {
			brojNeslozenihPolja = niz.length;
		}
	}
}

function novaIgra() {
	ocistiTablu();
	izmesajNiz();
	napraviTablu();
	$("#container").css("pointer-events", "auto");
}