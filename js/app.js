function copyMyIp() {
  /* Get the text field */
  var copyText = document.getElementById("ipAddress");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("IP copiada al portapeles: " + copyText.value);
}

document.onreadystatechange = async function () {
  if (document.readyState == "complete") {
    const request = await fetch("https://ipinfo.io/json?token=XXXXXXXXXXXX");
    const json = await request.json();

    const elem = document.getElementById("ipAddress");
    elem.value += json.ip;

    const location = json.loc.split(',');

    var map = L.map("map").setView(location, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(location)
      .addTo(map)
      .bindPopup(`Esta es la ubicación de tu ISP<br><strong> ${json.org}</strong>`)
      .openPopup();
  }
};
