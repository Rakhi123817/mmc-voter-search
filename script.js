const API = "https://qcpsmbetqgbucuoammik.supabase.co/rest/v1";
const KEY = "sb_publishable_Yo_hiLGl63AnMwj373uTKg_qLQ2Rr1a";

async function search() {
  const reg = document.getElementById("reg").value;
  const mobile = document.getElementById("mobile").value;

  if (!reg || !mobile) {
    alert("Both fields required");
    return;
  }

  const res = await fetch(
    `${API}/Voters?reg_no=eq.${reg}`,
    { headers: { "apikey": KEY } }
  );

  const data = await res.json();

  let output = "";

  if (data.length === 0) {
    output = "No record found";
  } else {
    output = `
      <p>Name: ${data[0].name}</p>
      <p>Center: ${data[0].center}</p>
      <p>Region: ${data[0].region}</p>
    `;
  }

  document.getElementById("result").innerHTML = output;

  await fetch(`${API}/search_logs`, {
    method: "POST",
    headers: {
      "apikey": KEY,
      "Authorization": "Bearer " + KEY
    },
    body: JSON.stringify({
      registration_no: reg,
      mobile_no: mobile
    })
  });
}
