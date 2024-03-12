// TITLE BAR
BODY.appendChild(translate('page.tanks.title', 'b', 'position: absolute; top:0px; left:115px; font-family: Trebuchet MS; width:1000px; font-size:50px; color: white; text-align:center;'));
addButtons('tanks');

function setDataTable(div, string, which, grade = false) {
    const tableBody = div.childNodes[1];
    const tableRow = tableBody.childNodes[0];
    const newWidth = Math.min(Math.max(string.toString().length, tableRow.childNodes[Math.abs(which - 1)].textContent.length, 6), 50);
    tableRow.childNodes[which].textContent = string;
    tableRow.childNodes[0].style = `width: ${9 * newWidth}px`;
    tableRow.childNodes[1].style = `width: ${9 * newWidth}px`;
    tableBody.style = `position: absolute; top: 19px; left: ${(FULLWIDE / 4) - (9 * newWidth) - 14}px; border-collapse:separate; border:0px; padding: 0px`;
    if (grade) {
        const val0 = parseInt(tableRow.childNodes[0].textContent);
        const val1 = parseInt(tableRow.childNodes[1].textContent);
        const max = 4 * (val0 + val1) / 6;
        const red0 = val0 < (3 * max / 4) ? 100 : (1 - (val0 - (3 * max / 4)) / (max / 4)) * 100;
        const green0 = val0 > (3 * max / 4) ? 100 : (((val0 - (max / 4)) / (max / 4)) - 1) * 100;
        tableRow.childNodes[0].style.backgroundColor = `rgb(${red0}, ${green0}, 0)`;
        const red1 = val1 < (3 * max / 4) ? 100 : (1 - (val1 - (3 * max / 4)) / (max / 4)) * 100;
        const green1 = val1 > (3 * max / 4) ? 100 : (((val1 - (max / 4)) / (max / 4)) - 1) * 100;
        tableRow.childNodes[1].style.backgroundColor = `rgb(${red1}, ${green1}, 0)`;
        if (val0 > val1) {
            tableRow.childNodes[0].style.borderColor = '#00BB00';
            //tableRow.childNodes[1].style.borderColor = '#333333';
        }
        if (val0 < val1) {
            tableRow.childNodes[1].style.borderColor = '#00BB00';
            //tableRow.childNodes[0].style.borderColor = '#333333';
        }
    }
}

// add data placeholders
const nameDiv = document.createElement('div');
const IGNDiv = document.createElement('div');
const FilenameDiv = document.createElement('div');
const crewDiv = document.createElement('div');
const massDiv = document.createElement('div');
const horsepowerDiv = document.createElement('div');
const rpmDiv = document.createElement('div');
const brakeDiv = document.createElement('div');
const topSpeedDiv = document.createElement('div');
const accelDiv = document.createElement('div');

const dataDivs = [nameDiv, IGNDiv, FilenameDiv, crewDiv, massDiv, horsepowerDiv, rpmDiv, brakeDiv, topSpeedDiv, accelDiv];
const dataDivsNames = ['name', 'IGN', 'filename', 'crew', 'mass', 'horsepower', 'engineRPM', 'brake', 'topSpeed', 'accel'];

BODY.appendChild(translate('page.tanks.table.tanksGeneral', 'b', `position:absolute; top:78px; left:${FULLWIDE / 4}px; width:${FULLWIDE / 2}px; text-align:center; font-size:20px; font-family: Trebuchet MS; color:white;`));

// add general data
for (let i = 0; i < dataDivs.length; i++) {
    dataDivs[i].appendChild(translate(`page.tanks.table.${dataDivsNames[i]}`, 'a', 'font-family: Helvetica; color:white'));
    dataDivs[i].style = `position: absolute; top: ${100 + (50 * i)}px; left: ${FULLWIDE / 4}px; width: ${FULLWIDE / 2}px; text-align: center`;
    BODY.appendChild(dataDivs[i]);

    const dataTable = document.createElement('table');
    dataTable.style = `position: absolute; top: 19px; left: ${(FULLWIDE / 4) - 70}px; width: 138px; border-collapse:separate; border:0px; padding: 0px`;
    dataDivs[i].appendChild(dataTable);
    const dataTableBody = document.createElement('tbody');
    dataTableBody.style = 'border: 0px';
    dataTable.appendChild(dataTableBody);
    dataTableBody.appendChild(translate('-', 'td'));
    dataTableBody.appendChild(translate('-', 'td'));
}

// add turret placeholders
const turretDiv = document.createElement('div');
BODY.appendChild(turretDiv);

BODY.appendChild(translate('page.tanks.table.tanksTurrets', 'b', `position:absolute; top:${120 + (dataDivs.length * 50)}px; left:${FULLWIDE / 4}px; width:${FULLWIDE / 2}px; text-align:center; font-size:20px; font-family: Trebuchet MS; color:white;`));

function defaultColorTurretTable(table) {
    for (let i = 0; i < table.childNodes.length; i++) {
        for (const element of table.childNodes[i].childNodes) {
            if (element != null) {
                if (i >= 25) {
                    element.style.backgroundColor = '#335544';
                    element.style.borderColor = '#669977';
                }
                else if (i >= 19) {
                    element.style.backgroundColor = '#333355';
                    element.style.borderColor = '#666699';
                }
                else if (i >= 12) {
                    element.style.backgroundColor = '#553344';
                    element.style.borderColor = '#996677';
                }
                else {
                    element.style.backgroundColor = '#333333';
                    element.style.borderColor = '#666666';
                }
            }
        }
    }
}

function colorTurretTable() {
    const table0 = turretDiv.childNodes[0];
    if (turretDiv.childNodes.length === 2) {
        defaultColorTurretTable(table0);
    }
    // dont color unless both sides have something
    if (turretDiv.childNodes.length < 4) {
        return;
    }
    const table1 = turretDiv.childNodes[2];
    defaultColorTurretTable(table1);

    const mainGuns0 = [];
    const mainGuns1 = [];

    // collect just the indices of the main gun(s)
    for (let i = 0; i < table0.childNodes[15].childNodes.length; i++) {
        if (!(table0.childNodes[15].childNodes[i].textContent.includes('　'))) {
            console.error(table0.childNodes[15].childNodes[i].textContent)
            mainGuns0.push(i);
        }
    }
    for (let i = 0; i < table1.childNodes[15].childNodes.length; i++) {
        if (!(table1.childNodes[15].childNodes[i].textContent.includes('　'))) {
            mainGuns1.push(i);
        }
    }

    // at least one of these tanks doesn't have a main gun at all. Skip coloring
    if (mainGuns0.length === 0 || mainGuns1.length === 0) {
        return;
    }

    // do the coloring on the main guns, excluding certain lines
    const skipLines = [0, 1, 12, 13, 19, 20, 25];
    const lowerBetter = [10];
    for (let i = 0; i < table1.childNodes.length; i++) {
        if (skipLines.includes(i)) {
            continue;
        }
        const values = [];
        let largest = lowerBetter.includes(i) ? 9007199254740991 : -1;
        for (const mainGun0 of mainGuns0) {
            const turretItem0 = table0.childNodes[i].childNodes[mainGun0];
            if (turretItem0 != null) {
                turretItem0.style.backgroundColor = 'rgb(100, 100, 0)';
                const val = toPlace(parseFloat((turretItem0.textContent === '　' || turretItem0.textContent === translate('N_A')) ? 0 : turretItem0.textContent), 2);
                values.push(val);
                // if only 2 turrets, don't highlight ties
                if (mainGuns0.length + mainGuns1.length === 2 && val === largest) {
                    largest = lowerBetter.includes(i) ? -1 : 9007199254740991;
                }
                // save largest value
                if (lowerBetter.includes(i) ? val < largest : val > largest) {
                    largest = val;
                }
            }
        }
        for (const mainGun1 of mainGuns1) {
            const turretItem1 = table1.childNodes[i].childNodes[mainGun1];
            if (turretItem1 != null) {
                turretItem1.style.backgroundColor = 'rgb(100, 100, 0)';
                const val = toPlace(parseFloat((turretItem1.textContent === '　' || turretItem1.textContent === translate('N_A')) ? 0 : turretItem1.textContent), 2);
                values.push(val);
                // if only 2 turrets, don't highlight ties
                if (mainGuns0.length + mainGuns1.length === 2 && val === largest) {
                    largest = lowerBetter.includes(i) ? -1 : 9007199254740991;
                }
                // save largest value
                if (lowerBetter.includes(i) ? val < largest : val > largest) {
                    largest = val;
                }
            }
        }
        const avg = (values.reduce((a, b) => a + b, 0) / values.length) || 0;
        const max = (4 * avg) / 3;

        for (const mainGun0 of mainGuns0) {
            if (table0.childNodes[i].childNodes[mainGun0] != null) {
                const val = toPlace(parseFloat(table0.childNodes[i].childNodes[mainGun0].textContent), 2);
                const red = val < (3 * max / 4) ? 100 : (1 - (val - (3 * max / 4)) / (max / 4)) * 100;
                const green = val > (3 * max / 4) ? 100 : (((val - (max / 4)) / (max / 4)) - 1) * 100;
                table0.childNodes[i].childNodes[mainGun0].style.backgroundColor = lowerBetter.includes(i) ? `rgb(${green}, ${red}, 0)` : `rgb(${red}, ${green}, 0)`;
                table0.childNodes[i].childNodes[mainGun0].style.borderColor = lowerBetter.includes(i) ? `rgb(${green}, ${red}, 0)` : `rgb(${red}, ${green}, 0)`;
                if (val === largest) {
                    table0.childNodes[i].childNodes[mainGun0].style.borderColor = '#00BB00';
                }
            }
        }
        for (const mainGun1 of mainGuns1) {
            if (table1.childNodes[i].childNodes[mainGun1] != null) {
                const val = toPlace(parseFloat(table1.childNodes[i].childNodes[mainGun1].textContent), 2);
                const red = val < (3 * max / 4) ? 100 : (1 - (val - (3 * max / 4)) / (max / 4)) * 100;
                const green = val > (3 * max / 4) ? 100 : (((val - (max / 4)) / (max / 4)) - 1) * 100;
                table1.childNodes[i].childNodes[mainGun1].style.backgroundColor = lowerBetter.includes(i) ? `rgb(${green}, ${red}, 0)` : `rgb(${red}, ${green}, 0)`;
                table1.childNodes[i].childNodes[mainGun1].style.borderColor = lowerBetter.includes(i) ? `rgb(${green}, ${red}, 0)` : `rgb(${red}, ${green}, 0)`;
                if (val === largest) {
                    table1.childNodes[i].childNodes[mainGun1].style.borderColor = '#00BB00';
                }
            }
        }
    }
}

// Color Dropdown
const btncolors = [colorGreen, colorRed, colorBlue, colorOrange];
window.refreshStars = [true, true];
window.dataNames = ['', ''];

// set up common header
const headerbox = document.createElement('header');
headerbox.id = 'header-box';
BODY.appendChild(headerbox);

const header = document.createElement('div');
header.className = 'header';
headerbox.append(header);

// create left nav
const leftNav = document.createElement('nav');
leftNav.style = 'position: absolute; top: 65px';
header.append(leftNav);
const leftNavList = document.createElement('ul');
leftNav.append(leftNavList);

// create right nav
const rightNav = document.createElement('nav');
rightNav.className = 'rightnav';
rightNav.style = `position: absolute; left: ${FULLWIDE - 250}px; top: 65px`;
header.append(rightNav);
const rightNavList = document.createElement('ul');
rightNav.append(rightNavList);

for (let h = 0; h < 2; h++) {
    // add color button dropdown to left and right nav
    const colorButtonContainer = document.createElement('li');
    colorButtonContainer.style.zIndex = 1;
    if (h === 0) {
        leftNavList.append(colorButtonContainer);
    }
    if (h === 1) {
        rightNavList.append(colorButtonContainer);
    }
    const colorButton = document.createElement('li');
    colorButton.className = `topbtn`;
    colorButton.style.backgroundColor = btncolors[h];
    colorButtonContainer.append(colorButton);
    const colorButtonText = document.createElement('a');
    colorButtonText.style = 'color: white; font-size:22px';
    colorButtonText.text = `${translate('Tank')} ${(h + 1)}`;
    colorButton.append(colorButtonText);
    const campaignList = document.createElement('ul');
    colorButton.append(campaignList);
    for (let i = -1; i < TANKS_META.length; i++) {
        const campaignButton = document.createElement('li');
        campaignButton.className = 'Link submenu';
        campaignList.append(campaignButton);

        const campaignButtonText = document.createElement('a');
        campaignButtonText.text = i < 0 ? translate('Remove') : translate(TANKS_META[i].Side);
        campaignButton.append(campaignButtonText);
        if (i < 0) {
            campaignButton.onclick = () => {
                // reset color button
                colorButtonText.text = `${translate('Tank')} ${h + 1}`;

                // remove stored name data TODO remove
                window.dataNames[h] = '';

                // remove table data
                for (const element of dataDivs) {
                    setDataTable(element, '-', h);
                }

                // remove turret table
                const turretTableToRemove = document.getElementById(`turretTable${h}`);
                if (turretTableToRemove != null) {
                    turretDiv.removeChild(turretTableToRemove);
                }
                const turretLabelsToRemove = document.getElementById(`turretLabelsDiv${h}`);
                if (turretLabelsToRemove != null) {
                    turretDiv.removeChild(turretLabelsToRemove);
                }
                colorTurretTable();
            };
            // don't access negative indices, just continue from the start
            continue;
        }
        const sideList = document.createElement('ul');
        campaignButton.append(sideList);

        for (const br of TANKS_META[i].BRs) {
            const brButton = document.createElement('li');
            brButton.className = 'Link submenu';
            sideList.append(brButton);

            const brButtonText = document.createElement('a');
            brButtonText.text = translate(br.BR)
            brButton.append(brButtonText);

            const brList = document.createElement('ul');
            brButton.append(brList);

            for (const tankName of br.Tanks) {
                const tankButton = document.createElement('li');
                tankButton.className = 'Link submenu';
                brList.append(tankButton);
                const tankButtonText = document.createElement('a');
                tankButtonText.text = translate(`item.${tankName}`);
                tankButton.append(tankButtonText);
                const tanklist = document.createElement('ul');
                tankButton.append(tanklist);

                tankButton.onclick = () => {
                    // clear existing
                    campaignList.childNodes[0].onclick();

                    // set color button name to selected tank
                    colorButtonText.text = tankButtonText.text;

                    // get data name
                    let TANK_DATA = null;
                    for (const tank of TANKS_JSON) {
                        if (tank.nameGame === tankName) {
                            TANK_DATA = tank;
                        }
                    }
                    if (TANK_DATA === null) {
                        return;
                    }

                    // set data tables
                    setDataTable(nameDiv, colorButtonText.text, h);
                    setDataTable(IGNDiv, tankName, h);
                    setDataTable(FilenameDiv, TANK_DATA.name.length <= 60 ? TANK_DATA.name : TANK_DATA.name.substring(0, 60) + '…', h);
                    setDataTable(crewDiv, TANK_DATA.crew, h, true);
                    setDataTable(massDiv, TANK_DATA.mass, h, true);
                    setDataTable(horsepowerDiv, TANK_DATA.horsepower, h, true);
                    setDataTable(rpmDiv, TANK_DATA.engineRPM, h, true);
                    setDataTable(brakeDiv, TANK_DATA.brake, h, true);
                    const powerFactor = TANK_DATA.horsepower / (TANK_DATA.mass / 1000);
                    let topSpeed = powerFactor * 1.97;
                    if (TANK_DATA.horsepower < 250) { // lower horsepower engines have better speed than the 1.97 multiple would suggest
                        topSpeed = powerFactor * ((-0.004604 * TANK_DATA.horsepower) + 3.304373);
                    }
                    setDataTable(topSpeedDiv, toPlace(topSpeed, 0), h, true);
                    setDataTable(accelDiv, toPlace(powerFactor, 1), h, true);
                    const turretArray = TANK_DATA.turrets;
                    const turretTable = document.createElement('table');
                    const tableWidth = (Math.min(250 * turretArray.length, 740));
                    // TODO: Remove explosion patch radius as it's deprecated
                    const labels = ['yawSpeed', 'pitchSpeed', 'depression', 'elevation', 'rotation', 'rpm', 'ammoCount', 'ammoBelt', 'reloadShell', 'APround', 'shellType', 'speed', 'armorPower', 'explosiveMass', 'explosiveRadius', 'HEround', 'shellType', 'speed', 'explosiveMass', 'explosiveRadius', 'smokeRound'];
                    turretTable.style = `position: absolute; table-layout: fixed; top:${148 + (dataDivs.length * 50)}px; left: ${h === 1 ? 940 : 940 - tableWidth}px; width: ${tableWidth}px; border-collapse:separate; border:0px; padding: 0px`;
                    turretTable.id = `turretTable${h}`;
                    turretDiv.appendChild(turretTable);
                    const turretTableHeader = document.createElement('thead');
                    turretTable.appendChild(turretTableHeader);
                    const turretTableHeaderRow = document.createElement('tr');
                    turretTableHeaderRow.style = 'height: 100px;';
                    turretTableHeader.appendChild(turretTableHeaderRow);
                    const labelsDiv = document.createElement('div');
                    labelsDiv.id = `turretLabelsDiv${h}`;
                    turretDiv.appendChild(labelsDiv);
                    for (let l = 0; l < labels.length; l++) {
                        labelsDiv.appendChild(translate(`page.tanks.table.${labels[l]}`, 'b', `position:absolute; top:${265 + (dataDivs.length * 50) + (l * 44.85)}px; left:${h === 0 ? 645 - tableWidth : 950 + tableWidth}px; width:285px; text-align:${h === 0 ? 'right' : 'left'}; font-size:18px; font-family: Helvetica; color:white;`));
                    }
                    const turretTableBody = document.createElement('tbody');
                    turretTable.appendChild(turretTableBody);
                    const yawTableRow = document.createElement('tr');
                    turretTable.appendChild(yawTableRow);
                    const pitchTableRow = document.createElement('tr');
                    turretTable.appendChild(pitchTableRow);
                    const depressionTableRow = document.createElement('tr');
                    turretTable.appendChild(depressionTableRow);
                    const elevationTableRow = document.createElement('tr');
                    turretTable.appendChild(elevationTableRow);
                    const rotationTableRow = document.createElement('tr');
                    turretTable.appendChild(rotationTableRow);
                    const rpmTableRow = document.createElement('tr');
                    turretTable.appendChild(rpmTableRow);
                    const ammoCountTableRow = document.createElement('tr');
                    turretTable.appendChild(ammoCountTableRow);
                    const ammoBeltTableRow = document.createElement('tr');
                    turretTable.appendChild(ammoBeltTableRow);
                    const reloadTableRow = document.createElement('tr');
                    turretTable.appendChild(reloadTableRow);

                    const blankRow = document.createElement('tr');
                    turretTable.appendChild(blankRow);

                    const APTableRow = document.createElement('tr');
                    turretTable.appendChild(APTableRow);
                    const APTypeTableRow = document.createElement('tr');
                    turretTable.appendChild(APTypeTableRow);
                    const APSpeedTableRow = document.createElement('tr');
                    turretTable.appendChild(APSpeedTableRow);
                    const APArmorPowerTableRow = document.createElement('tr');
                    turretTable.appendChild(APArmorPowerTableRow);
                    const APExplosiveMassTableRow = document.createElement('tr');
                    turretTable.appendChild(APExplosiveMassTableRow);
                    const APExplosiveRadiusTableRow = document.createElement('tr');
                    turretTable.appendChild(APExplosiveRadiusTableRow);

                    const blankRow2 = document.createElement('tr');
                    turretTable.appendChild(blankRow2);

                    const HETableRow = document.createElement('tr');
                    turretTable.appendChild(HETableRow);
                    const HETypeTableRow = document.createElement('tr');
                    turretTable.appendChild(HETypeTableRow);
                    const HESpeedTableRow = document.createElement('tr');
                    turretTable.appendChild(HESpeedTableRow);
                    const HEExplosiveMassTableRow = document.createElement('tr');
                    turretTable.appendChild(HEExplosiveMassTableRow);
                    const HEExplosiveRadiusTableRow = document.createElement('tr');
                    turretTable.appendChild(HEExplosiveRadiusTableRow);

                    const blankRow3 = document.createElement('tr');
                    turretTable.appendChild(blankRow3);

                    const SmokeTableRow = document.createElement('tr');
                    turretTable.appendChild(SmokeTableRow);

                    // combine duplicate turrets
                    function arrUnique(arr) {
                        let cleaned = [];
                        arr.forEach(function (itm) {
                            const temp_name = itm.name;
                            let unique = true;
                            cleaned.forEach(function (itm2) {
                                if (_.isEqual(itm, itm2)) {
                                    unique = false;
                                }
                            });
                            if (unique) {
                                cleaned.push(itm);
                            }
                        });
                        return cleaned;
                    }

                    const dedupTurretArray = arrUnique(_.cloneDeep(turretArray));
                    for (const dedupTurret of dedupTurretArray) {
                        let count = 0;
                        for (const turret of turretArray) {
                            if (_.isEqual(dedupTurret, turret)) {
                                count += 1;
                            }
                        }
                        dedupTurret.count = count;
                    }

                    // do print turret table
                    for (let l = 0; l < dedupTurretArray.length; l++) {
                        const turret = dedupTurretArray[h === 1 ? l : dedupTurretArray.length - l - 1];
                        turretTableHeaderRow.appendChild(translate(`${turret.gun.name.replace(/_/g, ' ')}${turret.count > 1 ? `<span style='color: aqua; font-size: 150%;'>   ×${turret.count}</span>` : ''}`, 'th'));
                        yawTableRow.appendChild(translate(turret.yaw == null ? `page.tanks.table.coax.${turret.gun.name.includes('smoke')}` : turret.yaw, 'th'));
                        pitchTableRow.appendChild(translate(turret.pitch == null ? `page.tanks.table.coax.${turret.gun.name.includes('smoke')}` : turret.pitch, 'th'));
                        depressionTableRow.appendChild(translate(turret.depression == null ? `page.tanks.table.coax.${turret.gun.name.includes('smoke')}` : `${turret.depression * -1} ${translate('degrees')}`, 'th'));
                        elevationTableRow.appendChild(translate(turret.elevation == null ? `page.tanks.table.coax.${turret.gun.name.includes('smoke')}` : `${turret.elevation} ${translate('degrees')}`, 'th'));
                        rotationTableRow.appendChild(translate(turret.rotation == null ? `page.tanks.table.coax.${turret.gun.name.includes('smoke')}` : `${turret.rotation} ${translate('degrees')}`, 'th'));
                        rpmTableRow.appendChild(translate(toPlace(turret.gun.rps * 60, 2), 'th'));
                        ammoCountTableRow.appendChild(translate(turret.ammo, 'th'));
                        ammoBeltTableRow.appendChild(translate(turret.gun.ammoBelt == null ? translate('individual') : turret.gun.ammoBelt, 'th'));
                        reloadTableRow.appendChild(translate(turret.gun.reload == null ? 'N_A' : turret.gun.reload, 'th'));
                        let shellAP = null;
                        let shellHE = null;
                        let shellSmoke = null;

                        for (const shell of turret.gun.shells) {
                            if (shellSmoke == null && shell.type.includes('smoke')) {
                                shellSmoke = shell;
                            }
                            else if (shellHE == null && (shell.type.includes('frag') || shell.type.includes('shrapnel'))) {
                                shellHE = shell;
                            }
                            else if (shellAP == null) {
                                shellAP = shell;
                            }
                            else {
                                console.warn("extra shell?: " + JSON.stringify(shell));
                            }
                        }


                        // AP shell data
                        if (shellAP != null) {
                            APTableRow.appendChild(translate((shellAP.name == null ? shellAP.type : shellAP.name).replace(/_/g, ' '), 'th', '', 80 / dedupTurretArray.length));
                            APTypeTableRow.appendChild(translate(shellAP.type.replace(/_/g, ' '), 'th'));
                            APSpeedTableRow.appendChild(translate(`${shellAP.speed} ${translate('mps')}`, 'th'));
                            if (shellAP.cumulativeArmorPower != null) {
                                APArmorPowerTableRow.appendChild(translate(`${shellAP.cumulativeArmorPower} ${translate('millimeters')}`, 'th'));
                            } else if (shellAP.demarrePenetrationK != null) {
                                const refDiam = 45;
                                const refMass = 1.43;
                                const refVel = 870;
                                const refPen = 0.069;
                                const diam = shellAP.caliber * 1000;
                                const shellMass = shellAP.mass;
                                const vel = shellAP.speed;
                                const deMarreArmorPower = refPen * ((vel / refVel) ** 1.43) * ((diam / refDiam) ** 1.07) * ((shellMass / (diam ** 3)) ** 0.71) / ((refMass / (refDiam ** 3)) ** 0.71);
                                APArmorPowerTableRow.appendChild(translate(`${1000 * toPlace(deMarreArmorPower, 3)} ${translate('millimeters')}`, 'th'));
                            } else {
                                APArmorPowerTableRow.appendChild(translate('　', 'th'));
                            }
                            APExplosiveMassTableRow.appendChild(translate(shellAP.explosiveMass == null ? translate('N_A') : `${shellAP.explosiveMass} ${translate('kg')}`, 'th'));
                            APExplosiveRadiusTableRow.appendChild(translate(shellAP.explosionPatchRadius == null ? 0 : `${shellAP.explosionPatchRadius} ${translate('meters')}`, 'th'));
                        } else {
                            APTableRow.appendChild(translate('N_A', 'th'));
                            APTypeTableRow.appendChild(translate('　', 'th'));
                            APSpeedTableRow.appendChild(translate('　', 'th'));
                            APArmorPowerTableRow.appendChild(translate('　', 'th'));
                            APExplosiveMassTableRow.appendChild(translate('　', 'th'));
                            APExplosiveRadiusTableRow.appendChild(translate('　', 'th'));
                        }
                        // HE shell data
                        if (shellHE != null) {
                            HETableRow.appendChild(translate((shellHE.name == null ? shellHE.type : shellHE.name).replace(/_/g, ' '), 'th', '', 80 / dedupTurretArray.length));
                            HETypeTableRow.appendChild(translate(shellHE.type.replace(/_/g, ' '), 'th'));
                            HESpeedTableRow.appendChild(translate(`${shellHE.speed} ${translate('mps')}`, 'th'));
                            HEExplosiveMassTableRow.appendChild(translate(shellHE.explosiveMass == null ? translate('N_A') : `${shellHE.explosiveMass} ${translate('kg')}`, 'th'));
                            HEExplosiveRadiusTableRow.appendChild(translate(shellHE.explosionPatchRadius == null ? 0 : `${shellHE.explosionPatchRadius} ${translate('meters')}`, 'th'));
                        } else {
                            HETableRow.appendChild(translate('N_A', 'th'));
                            HETypeTableRow.appendChild(translate('　', 'th'));
                            HESpeedTableRow.appendChild(translate('　', 'th'));
                            HEExplosiveMassTableRow.appendChild(translate('　', 'th'));
                            HEExplosiveRadiusTableRow.appendChild(translate('　', 'th'));
                        }
                        // Smoke shell data
                        if (shellSmoke != null) {
                            SmokeTableRow.appendChild(translate((shellSmoke.name == null ? shellSmoke.type : shellSmoke.name).replace(/_/g, ' '), 'th', '', 80 / dedupTurretArray.length));
                        } else {
                            SmokeTableRow.appendChild(translate('N_A', 'th'));
                        }
                    }
                    colorTurretTable();
                };
            }
        }
    }
}