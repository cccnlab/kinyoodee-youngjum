import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CJSInstruction.scss';
import BreadCrumb from '../../../components/breadcrumbs/breadCrumb';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import CJSWindow from '../../../components/gameWindow/cjsWindow/CJSWindow';
import CJSButton from '../../../components/gameWindow/cjsWindow/cjsButton/CJSButton';
import useSound from 'use-sound';
import clickSoundSrc from '../../../assets/sound/click.mp3';
import combo2SoundSrc from '../../../assets/sound/combo2.mp3';
import losingSoundSrc from '../../../assets/sound/losingStreak.mp3';
import instructionCanvas from '../../../assets/png/canvas.png';
import instructionProgressbar from '../../../assets/png/progressBar.png';
import instructionPerson from '../../../assets/png/instructionPerson.png';
import instructionFinished from '../../../assets/png/instructionFinished.png';
import { Shuffle } from '../../../scripts/shuffle';
import * as vismem from '../../../scripts/vismemCC_simon';
import RotateAlert from '../../../components/rotateAlert/RotateAlert';

let myCanvas: HTMLCanvasElement;
let canvasContext: CanvasRenderingContext2D;
let progressBarElement: HTMLProgressElement;
let trialNumber = 100;
let curTrial = 0;
let backgroundColor = '#E5E5E5';
let stimulusColor = ['#0072FF', '#FFC837'];
let searchTargetList: any[][] = [
    [
        { description: 'สี่เหลี่ยมสีฟ้า', color: 'blue', shape: 'square' },
        { description: 'สี่เหลี่ยมเหลือง', color: 'yellow', shape: 'square' }
    ],
    [
        { description: 'วงกลมสีฟ้า', color: 'blue', shape: 'circle' },
        { description: 'วงกลมเหลือง', color: 'yellow', shape: 'circle' }
    ]
]
let canvasWidth = 800;
let canvasHeight = 800;
let squareWidth = 55;
let squareHeight = 55;
let radius = squareWidth / 2;
let positionJitter = 8;
let centerX: number;
let centerY: number;
let Xspan = canvasWidth / 2;
let Yspan = canvasHeight / 2;
let XblockNumber = 8;
let YblockNumber = 6;
let Xblock = Xspan * 2 / XblockNumber;
let Yblock = Yspan * 2 / YblockNumber;
let X: number[]
let Y: number[]
let Xs: number[] = [];
let Ys: number[] = [];
let Xtemps: number[] = [];
let Ytemps: number[] = [];
let posId: number[] = [];
let maxSS = Math.floor((XblockNumber * YblockNumber - 1) / 2);
let ceilingSS = 0;
let currSS = 2;
let change = NaN;
let shapeRand = [0, 1];
let ori: number[]
let col: string[]
let oris: number[] = [];
let cols: number[] = [];
let count = 0;
let NupNdown = 1;
let trackRecord = 0;

function CJSInstruction(props) {
    const navigate = useNavigate();
    const [tutorialStep, setTutorialStep] = useState(1);
    const [tutorialTest, setTutorialTest] = useState('');
    const [tutorialHide, setTutorialHide] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    const [justWait, setJustWait] = useState(false);
    const [clickSound] = useSound(clickSoundSrc);
    const [combo2Sound] = useSound(combo2SoundSrc);
    const [losingSound] = useSound(losingSoundSrc);
    const [searchTarget, setSearchTarget] = useState<{ shape: number, col: number }>();
    const [progressValue, setProgressValue] = useState(15);

    useEffect(() => {
        initiateData();
        setSearchTarget({ shape: (Math.random() > 0.5 ? 1 : 0), col: (Math.random() > 0.5 ? 1 : 0) });
    }, [])

    useEffect(() => {
        if (searchTarget) {
            oris = [];
            for (let j = 0; j < maxSS; j++) { oris.push(0); oris.push(1) };
            cols = [];
            for (let k = 0; k < maxSS; k++) { cols.push(0); cols.push(1) };
            if (searchTarget.shape === 1) {
                shapeRand = [1, 0];
            } else {
                shapeRand = [0, 1];
            }
            if (searchTarget.col === 1) {
                for (let j = 0; j < cols.length; j++) { cols[j] = 1 - cols[j] };
            }
            createTargetCanvas();
            createCanvas();
        }
    }, [searchTarget])

    function initiateData() {
        currSS = 2;
        ceilingSS = 0;
        count = 0;
        curTrial = 0;
        Xtemps = [];
        Xs = [];
        Ytemps = [];
        Ys = [];
        posId = [];
    }

    function createTargetCanvas() {
        let cv: HTMLCanvasElement = document.getElementById("target-canvas") as HTMLCanvasElement;
        if (cv) {
            let ctx: CanvasRenderingContext2D = cv.getContext("2d") as CanvasRenderingContext2D;
            let xOffset = cv.width / 2;
            if (searchTarget?.col === 1) {
                ctx.strokeStyle = '#FFC837'
                ctx.fillStyle = '#FFC837';
            } else if (searchTarget?.col === 0) {
                ctx.strokeStyle = '#0072FF'
                ctx.fillStyle = '#0072FF';
            }
            if (searchTarget?.shape === 0) {
                ctx.rect(xOffset - 10, cv.height - 21, 20, 20);
            } else if (searchTarget?.shape === 1) {
                ctx.arc(xOffset, cv.height - 11, 10, 0, 2 * Math.PI);
            }
            ctx.stroke();
            ctx.fill();
        }
    }

    function createCanvas() {
        myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        canvasContext = myCanvas.getContext("2d") as CanvasRenderingContext2D;
        centerX = myCanvas.width / 2;
        centerY = myCanvas.height / 2;

        for (var ix = 0; ix < XblockNumber; ix++) {
            Xtemps.push(Math.round(Xblock / 2) + Xblock * ix - Xspan + centerX)
        }

        for (var iy = 0; iy < YblockNumber; iy++) {
            Ytemps.push(Math.round(Yblock / 2) + Yblock * iy - Yspan + centerY)
        }

        for (ix = 0; ix < XblockNumber; ix++) {
            for (iy = 0; iy < YblockNumber; iy++) {
                Xs.push(Xtemps[ix]);
                Ys.push(Ytemps[iy]);
                posId.push(count);
                count++;
            }
        }

        myCanvas.hidden = false;
        initialT(0, currSS);
    }

    function initialT(_waittime, SS) {
        if (!ceilingSS) {
            ceilingSS = SS + 1;
        };
        vismem.erase(canvasContext);
        vismem.clear();
        shuffleSS(SS);
        makeBackground(backgroundColor);
        makeSearchArray(X, Y, squareWidth, squareHeight, ori, col);
        vismem.drawObjects(canvasContext, vismem.objects);
    }

    function shuffleSS(setsize) {
        Shuffle(posId);
        X = []; for (let ix = 0; ix < setsize + 1; ix++) { X.push(Xs[posId[ix]]) };
        Y = []; for (let iy = 0; iy < setsize + 1; iy++) { Y.push(Ys[posId[iy]]) };
        ori = []; for (let j = 0; j < setsize; j++) { ori.push(oris[j]) };
        col = []; for (let j = 0; j < setsize; j++) { col.push(stimulusColor[cols[j]]) };
        // add the target or not
        if (Math.random() > 0.5) {
            ori.push(oris[setsize]);
            col.push(stimulusColor[cols[setsize]]);
        } else {
            ori.push(1 - oris[setsize]);
            col.push(stimulusColor[cols[setsize]]);
        }
    }

    function makeBackground(backgroundColor) {
        // Fill background
        vismem.makeRectangle('bg', centerX, centerY, canvasWidth, canvasHeight, false, backgroundColor, backgroundColor);
    }

    function makeSearchArray(numarrayX, numarrayY, squareWidth, squareHeight, orienVec, colorVec) {
        for (let i = 0; i < orienVec.length; i++) {
            if (orienVec[i] === shapeRand[0]) {
                vismem.makeCircle('c', numarrayX[i] + (Math.random() - 0.5) * 2 * positionJitter, numarrayY[i] + (Math.random() - 0.5) * 2 * positionJitter, radius, false, colorVec[i], colorVec[i]);
            } else {
                vismem.makeRectangle('s', numarrayX[i] + (Math.random() - 0.5) * 2 * positionJitter, numarrayY[i] + (Math.random() - 0.5) * 2 * positionJitter, squareHeight, squareWidth, false, colorVec[i], colorVec[i], 0, 0);
            }
        }
        if (searchTarget) {
            // Find Target from Object
            let find = vismem.objects.find(x => x.id === (searchTarget.shape === 0 ? 's' : 'c') && x.color === stimulusColor[searchTarget.col])
            change = find ? 1 : 0
        }
    }

    function checkResp(foo) {
        clickSound();

        if (tryAgain === true) {
            setTryAgain(false);
        }

        setJustWait(true); // for prevent double click 'ถัดไป' when ans is correct via 'ใข่' button 
        setTimeout(() => {
            setJustWait(false);
        }, 500);

        if (change === foo) {
            if (tutorialTest === '') {
                setTutorialTest('right');
            }
            combo2Sound();
            trackRecord = trackRecord + 1;
        } else {
            if (tutorialTest === '') {
                setTutorialTest('wrong');
            }
            losingSound()
            trackRecord = 0;
            setTimeout(() => {
                setTryAgain(true);
            }, 1000);
        }

        if (tutorialStep !== 6) {
            setProgressValue(progressValue + 17);
        }
        trialIsOver();
        instructionControl();
    }

    function trialIsOver() {
        vismem.erase(canvasContext);
        vismem.clear();
        makeBackground(backgroundColor)
        vismem.drawObjects(canvasContext, vismem.objects);
        if (trackRecord >= NupNdown) {
            if (currSS < maxSS * 2 - 2) {
                currSS = currSS + 1;
                ceilingSS = currSS + 1;
            } else {
                ceilingSS = currSS + 1;
            }
        }

        // different from conjs-trial
        if (trackRecord === 0 && currSS > 2) {
            currSS = currSS;
        }

        curTrial = curTrial + 1;
        if (curTrial >= trialNumber) {
            // Done();
        } else {
            initialT(0, currSS);
        }
    }

    function instructionControl() {
        if (tutorialStep === 7 && tutorialTest === 'wrong') {
            setTutorialStep(tutorialStep - 1);
            setTutorialTest('');
            setTutorialHide(true);
        } else {
            setTutorialStep(tutorialStep + 1);
            if (tutorialStep !== 5 && tutorialStep !== 8 
                && tutorialStep !== 9 && tutorialStep !== 10 
                && tutorialStep !== 11 && tutorialStep !== 12) {
                setTutorialHide(false);
            } else {
                setTutorialHide(true);
            }
        } 
    }

    function backToCJSLanding() {
        navigate('/conjunction-search');
    }

    return (
        <div className='card' style={{ alignItems: 'center', placeContent: 'center' }}>
            {tutorialHide === false ?
                <div className="tutorial">
                        <div className={'progressBarContainerInstruction' + (tutorialStep !== 14 ? ' onHide' : '')}>
                            <img src={instructionProgressbar} alt="progressbar" id="instructionProgressbar"></img>       
                        </div>
                    <div className={'instructionContainer' + (tutorialStep === 15 ? ' centered': '')}>
                        <div className="instructionPic"> 
                            <div className={'canvasContainerInstruction' + (tutorialStep !== 3 ? ' onHide' : '')}>
                                {searchTarget ?
                                    <div className='instructionSearchInstruction'>
                                        มี<b className={'search-text ' + searchTargetList[searchTarget.shape][searchTarget.col].color}>  {searchTargetList[searchTarget.shape][searchTarget.col].description}</b>
                                        <span className={'search-img ' + searchTargetList[searchTarget.shape][searchTarget.col].shape + ' ' + searchTargetList[searchTarget.shape][searchTarget.col].color}></span>
                                        หรือไม่?
                                    </div>
                                : null}
                                <img src={instructionCanvas} alt="canvas" id="instructionCanvas"></img>
                            </div> 
                        </div>
                        <div className={'btnContainerInstruction' + (tutorialStep !== 4 ? ' onHide' : '')}>
                            <button id='no-btn' className='btn no-btn circle lg'> ไม่มี </button>
                            <button id='yes-btn' className='btn yes-btn circle lg'> มี </button>
                        </div>
                        <div className="instructionPerson">
                            <img src={instructionPerson} alt="an instruction guy" className={'personStart' + (tutorialStep < 15 ? '': ' onHide')}></img>
                            <img src={instructionFinished} alt="an instruction guy" className={'personEnd' + (tutorialStep === 15 ? '': ' onHide')}></img>
                        </div>
                        <div className="instructionBox">
                            <div className= "instructionText">
                                {tutorialStep === 1 ? <p>สวัสดีครับ วันนี้ผมจะมาสอนวิธี <br></br>เล่นเกม <b>'หากันจนเจอ'</b></p> : null}
                                {tutorialStep === 2 ? <p>เป้าหมายของเกมนี้คือการหา <br></br><b>รูปทรงที่มีสีตามที่กำหนด</b></p> : null}
                                {tutorialStep === 3 && searchTarget ? <p>อย่างเช่นให้คุณหา <b>{searchTargetList[searchTarget.shape][searchTarget.col].description}</b></p> : null}
                                {tutorialStep === 4 ? <p>หากมีให้กดปุ่ม “<b style={{ color : `#26A445`}}>มี</b>”  <br></br>หากไม่มีกดปุ่ม “<b style={{ color : `#E52D27`}}>ไม่มี</b>”</p> : null}
                                {tutorialStep === 5 ? <p>เรามาลองเล่นกันดูครับ </p> : null}
                                {tutorialStep === 7 && tutorialTest === 'right' ? <p>ถูกต้องครับ! <br></br><br></br>คะแนนเกมนี้ จะขึ้นอยู่กับความไว <br></br>ด้วย ดังนั้นพยายามตอบให้<b>เร็วที่สุด</b></p> : null}
                                {tutorialStep === 7 && tutorialTest === 'wrong' ? <p>อย่าลืมนะครับ ว่าต้องเป็น  <br></br><b>รูปทรงที่มีสีตามที่กำหนด</b></p> : null}
                                {tutorialStep === 8 ? <p>เรามาเล่นอีกที คราวนี้ลองพยายาม<br></br> ตอบให้<b>เร็วที่สุด</b> นะครับ</p> : null}
                                {tutorialStep === 14 ? <p>เมื่อแถบนี้เต็ม เกมก็จะจบลง</p> : null}
                                {tutorialStep === 15 ? <p>ยินดีด้วย! คุณได้ผ่านการฝึกเล่น <br></br>เกม <b>'หากันจนเจอ'</b> แล้ว</p> : null}
                            </div>
                            <div className="instructionControl">
                                <div className="instructionBtnBack">
                                {tutorialStep === 1 || tutorialStep === 7 || tutorialStep === 14 ? null : <button className="backInstruction" onMouseDown={() => {setTutorialStep(tutorialStep - 1)}}>{`< ย้อนกลับ`}</button>}
                                </div>
                                <div className="instructionBtnNext">
                                {tutorialStep === 7 && tutorialTest === 'wrong' ? <button disabled={tryAgain === false} className={'nextInstruction'} onMouseDown={() => {instructionControl()}}>{`ลองอีกครั้ง >`}</button> : null}
                                {tutorialStep < 15 ?  
                                    <button disabled={justWait === true} className={'nextInstruction' + (tutorialTest === 'wrong' ? ' onHide' : '')} onMouseDown={() => {instructionControl()}}>{tutorialStep === 5 || tutorialStep === 8 ? `ลองเล่น >` : `ถัดไป >`}</button> :
                                    <button className="nextInstruction" onMouseDown={() => {backToCJSLanding()}}>{`กลับเมนูเกม >`}</button> }    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : null}
            <div className='row'>
            <div className='py-4 px-12 sm:py-8 w-full bg-blue-100 shadow-md'>
              {<BreadCrumb />}
            </div>
            <div id='CJSInstructionBody'>
                <div className="CJSInstructionBodyProgressBar">
                    {<ProgressBar progressValue={progressValue} trialNumber={100}/>}
                </div>
                <div className="CJSInstructionWindow">
                    {<CJSWindow searchTarget={searchTarget} searchTargetList={searchTargetList} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>}
                </div>
                <div className="CJSInstructionEnterButton">
                    {<CJSButton searchTarget={searchTarget} checkResp={checkResp}/>}
                </div>
            </div>
        </div>
        {<RotateAlert />}
        </div>
    )
}
export default CJSInstruction;