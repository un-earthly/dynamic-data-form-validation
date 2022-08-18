import './style.css'
const getElement = id => document.getElementById(id)
window.addEventListener("load", e => {
  getElement("loader").style.display = "none"
})


const checkSpecialChar = str => !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str) ? { success: str } : { err: { msg: "Found Special Char" } }
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  const source = e.target.source.value.length > 5 ? checkSpecialChar(e.target.source.value) : { err: { msg: "Length Is less than 5" } }
  const pipeline = e.target.pipeline.value.length > 5 ? checkSpecialChar(e.target.pipeline.value) : { err: { msg: "Length Is less than 5" } }
  const projectName = e.target.projectName.value.length > 5 ? checkSpecialChar(e.target.projectName.value) : { err: { msg: "Length Is less than 5" } }
  const bucketName = e.target.bucketName.value.length > 5 ? checkSpecialChar(e.target.bucketName.value) : { err: { msg: "Length Is less than 5" } }
  const files = e.target.files.value.length > 5 ? checkSpecialChar(e.target.files.value) : { err: { msg: "Length Is less than 5" } }
  const credentials = e.target.credentials.value.length > 5 ? checkSpecialChar(e.target.credentials.value) : { err: { msg: "Length Is less than 5" } }
  const runIn = e.target.runIn.value.length > 5 ? checkSpecialChar(e.target.runIn.value) : { err: { msg: "Length Is less than 5" } }


  const errors = {
    pipeline,
    projectName,
    bucketName,
    files,
    credentials,
    runIn,
    source
  }


  Object.entries(errors).map((key, index) => {
    const parent = document.querySelector(`[data-${key[0]}]`)
    parent.childNodes[5]?.remove()
    const p = document.createElement("p")
    const errMsg = key[1].err ? key[1].err.msg : "";
    p.innerHTML = errMsg
    p.style.color = "#FF2400"
    parent.appendChild(p)
  });


})


getElement("renderForm").addEventListener("click", e => {
  getElement("form").style.display = "flex"
  getElement("table").style.display = "none"

})
getElement("renderTable").addEventListener("click", e => {
  // getElement("tparent").style.display = "table"
  getElement("form").style.display = "none"
  const table = getElement("table")
  table.innerHTML = ""
  table.style.display = "block"
  const thead = document.createElement("thead")
  const tbody = document.createElement("tbody")
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const tr1 = document.createElement("tr")
      const tr2 = document.createElement("tr")
      data[0].map(cellheading => {
        const th = document.createElement("th")
        th.innerText = cellheading
        th.style.color = "white";
        thead.appendChild(th)

      })

      data[1].map(cellData => {
        const td = document.createElement("td")
        td.innerText = cellData
        tr1.appendChild(td)
        tbody.appendChild(tr1)
      })

      data[2].map(cellData => {
        const td = document.createElement("td")
        td.innerText = cellData

        tr2.appendChild(td)
        tbody.appendChild(tr2)

      })


    })

  table.appendChild(thead)
  table.appendChild(tbody)
  // console.log("renderTable")
})