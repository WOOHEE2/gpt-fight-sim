async function startFight() {
  const ngannouAdj = document.getElementById("ngannouInput").value.trim();
  const ohtaniAdj = document.getElementById("ohtaniInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!ngannouAdj || !ohtaniAdj) {
    resultDiv.innerHTML = "⚠️ 수식어를 모두 입력해주세요.";
    return;
  }

  resultDiv.innerHTML = "AI 판단 중... 🤖";

  try {
    const res = await fetch("http://localhost:3000/api/fight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ngannouAdj, ohtaniAdj }),
    });

    const data = await res.json();
    resultDiv.innerHTML = `
      은가누: ${ngannouAdj}<br>
      오타니: ${ohtaniAdj}<br><br>
      🧠 AI 판단 승자: <strong>${data.winner}</strong>!
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ 판단 실패. 서버 상태를 확인해주세요.";
  }
}
