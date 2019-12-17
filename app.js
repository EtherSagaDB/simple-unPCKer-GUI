const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

function unpck() {
  // On Windows Only...
  // Your game directory
  const gamedirectory = document.getElementById("directory").files[0].path;
  // Where you want your pck files copied and extracted
  const savedirectory = document.getElementById("save-dir").files[0].path;
  // File you want to unpck
  const select = document.getElementById("selection");
  //Fix Bug and Script.pck
  const selection = select.value.replace(`\\help\\`, `\\`)
  const selectionClean = selection.replace(`\\reportbugs\\`, `\\`)
  // Join save path with file
  const unPCKfile = path.join(savedirectory, selectionClean);
  // Join game path with file
  const file = gamedirectory + select.value;

  const command = `xcopy /y "${file}" "${savedirectory}"\nsPCK.exe -eso -x "${unPCKfile}"\nexplorer.exe ${savedirectory}`;

  fs.writeFile("unpck.bat", command, err => {
    const bat = spawn("cmd.exe", ["/c", "unpck.bat"]);

    bat.stdout.on("data", data => {
      console.log(data.toString());
    });

    bat.stderr.on("data", data => {
      console.error(data.toString());
    });

    bat.on("exit", code => {
      console.log(`Child exited with code ${code}`);
    });
  });
}

function unpckall() {
  // Your game directory
  const gamedirectory = document.getElementById("directory").files[0].path;
  // Where you want your pck files copied and extracted
  const savedirectory = document.getElementById("save-dir").files[0].path;
  const command = `xcopy /y "${gamedirectory}\\reportbugs\\Bug.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\building.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\configs.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\facedata.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\gfx.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\grasses.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\interfaces.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\litmodels.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\loddata.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\models.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\help\\script.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\sfx.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\shaders.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\surfaces.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\textures.pck" "${savedirectory}"\n
    xcopy /y "${gamedirectory}\\trees.pck" "${savedirectory}"\n
    sPCK.exe -eso -x "${savedirectory}/Bug.pck"\n
    sPCK.exe -eso -x "${savedirectory}/building.pck"\n
    sPCK.exe -eso -x "${savedirectory}/configs.pck"\n
    sPCK.exe -eso -x "${savedirectory}/facedata.pck"\n
    sPCK.exe -eso -x "${savedirectory}/gfx.pck"\n
    sPCK.exe -eso -x "${savedirectory}/grasses.pck"\n
    sPCK.exe -eso -x "${savedirectory}/interfaces.pck"\n
    sPCK.exe -eso -x "${savedirectory}/litmodels.pck"\n
    sPCK.exe -eso -x "${savedirectory}/loddata.pck"\n
    sPCK.exe -eso -x "${savedirectory}/models.pck"\n
    sPCK.exe -eso -x "${savedirectory}/help.pck"\n
    sPCK.exe -eso -x "${savedirectory}/sfx.pck"\n
    sPCK.exe -eso -x "${savedirectory}/shaders.pck"\n
    sPCK.exe -eso -x "${savedirectory}/surfaces.pck"\n
    sPCK.exe -eso -x "${savedirectory}/textures.pck"\n
    sPCK.exe -eso -x "${savedirectory}/trees.pck"\n
    explorer.exe ${savedirectory}`;

  fs.writeFile("unpckall.bat", command, err => {
    const bat = spawn("cmd.exe", ["/c", "unpckall.bat"]);

    bat.stdout.on("data", data => {
      console.log(data.toString());
    });

    bat.stderr.on("data", data => {
      console.error(data.toString());
    });

    bat.on("exit", code => {
      console.log(`Child exited with code ${code}`);
    });
  });
}
