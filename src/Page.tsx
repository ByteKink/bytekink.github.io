import React, { useEffect, useState } from "react";
import KinkCard from "./KinkCard";
import { impactPlayList } from "./data/impactPlay";
import { bondageList } from "./data/bondage";
import { sensationList } from "./data/sensations";
import { intimacyList } from "./data/intimacy";
import { penetrationList } from "./data/penetration";
import { feelingsList } from "./data/feelings";
import { safewordList } from "./data/safewords";
import { marksList } from "./data/marks";
import { aftercareList } from "./data/aftercare";
import { Fetish } from "./data/fetishModel";
import { useLocation } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";

interface FetishState {
  [index: number]: string;
}

const setDefaultState = (list: Fetish[]): FetishState => {
  return list.reduce((acc, cur, currI) => {
    return { [currI]: "1", ...acc };
  }, {});
};

const encodeMap = (state: FetishState) => {
  const values = Object.values(state).join("");
  const base10 = parseInt(values, 3);
  return base10.toString(36);
};

const decodeString = (encodedString: string): FetishState => {
  const base36 = parseInt(encodedString, 36);
  const base3 = base36.toString(3);
  const explodedString = base3.split("");
  return explodedString.reduce((acc, cur, currI) => {
    return { [currI]: cur, ...acc };
  }, {});
};

const getServerAndScheme = (): string => {
  return window.location.href.split("/").slice(0, -1).join("/");
};

const copyToClipboard = (code: string): void => {
  navigator.clipboard.writeText(`${getServerAndScheme()}/${code}`);
};

const Page = () => {
  const location = useLocation();
  const [customUrl, setCustomUrl] = useState<string>("");

  const [impactState, setImpactState] = useState<FetishState>(
    setDefaultState(impactPlayList)
  );
  const [bondageState, setBondageState] = useState<FetishState>(
    setDefaultState(bondageList)
  );
  const [sensationState, setSensationState] = useState<FetishState>(
    setDefaultState(sensationList)
  );
  const [intimacyState, setIntimacyState] = useState<FetishState>(
    setDefaultState(intimacyList)
  );
  const [penetrationState, setPenetrationState] = useState<FetishState>(
    setDefaultState(penetrationList)
  );
  const [feelingsState, setFeelingsState] = useState<FetishState>(
    setDefaultState(feelingsList)
  );
  const [safewordState, setSafewordState] = useState<FetishState>(
    setDefaultState(safewordList)
  );
  const [marksState, setMarksState] = useState<FetishState>(
    setDefaultState(marksList)
  );
  const [aftercareState, setAftercareState] = useState<FetishState>(
    setDefaultState(aftercareList)
  );

  // The order of these arrays must stay consistent, and in the same order
  // New states get appended to the end to keep old encoded strings working
  const stateList = [
    impactState,
    bondageState,
    sensationState,
    intimacyState,
    penetrationState,
    feelingsState,
    safewordState,
    marksState,
    aftercareState,
  ];
  const setStateList = [
    setImpactState,
    setBondageState,
    setSensationState,
    setIntimacyState,
    setPenetrationState,
    setFeelingsState,
    setSafewordState,
    setMarksState,
    setAftercareState,
  ];

  useEffect(() => {
    const encodedString = location.pathname.split("/").splice(-1)[0];
    if (encodedString !== "") {
      const explodedEncodedStrings = encodedString.split(":");
      explodedEncodedStrings.forEach((s, i) => setStateList[i](decodeString(s)));
    }
  }, [location]);

  useEffect(() => {
    const encodedStates = stateList.map((s) => encodeMap(s));
    setCustomUrl(encodedStates.join(":"));
    setClipboardCopied(false);
  }, stateList);

  const [clipboardCopied, setClipboardCopied] = useState(false);

  return (
    <div className="container mb-5" data-bs-theme="dark">
      <header>
        <h1>Scene Negotiation</h1>
      </header>
      <div className="d-flex justify-content-between">
        <div className="me-3 ms-3">
          <p>Use this form to negotiate a BDSM Scene.</p>
          <p>There are no right or wrong answers.</p>
          <p>
            The primary purpose of this form is to help start a dialog before a
            scene.
          </p>
          <p>
            Selecting Yes means this is something I want to do during the Scene.
          </p>
          <p>
            Selecting No mean this is something I want to aviod during a Scene
            (hard/soft limits).
          </p>
          <p>
            Leaving it unselected means it needs to be talked about if one party
            wants to experience it during a scene.
          </p>
          <p className="mb-4">
            Just besauce it is selected doesn't mean it needs to be in a scene.
          </p>

          <p>
            Remeber <b>Consent</b>, and Discuss wants
          </p>
          <p className="mb-4">
            Don't be afraid of clarification: What do you mean by ___________?
          </p>

          <p>Answer honestly, then talk to your play partner</p>
          <p>Be cautious of trying new things with new partners</p>
          <p>
            Don't feel bad about changing your mind after talking to your
            partner, bet negotiate before you start to play
          </p>
          <p className="mb-4">
            It is safer to remove activities during a scene then to add play you
            did not agree to beforehand
          </p>

          <p>Don't forget to discuss safe words</p>

          <p>
            This is a digital version of a form from the Academy of Fetish Arts.
          </p>
        </div>
        <div className="text-center" style={{ maxWidth: "350px" }}>
          <div className="mb-2 fs-4">Your Custom Code:</div>
          <InputGroup.Text
            onClick={() => {
              copyToClipboard(customUrl);
              setClipboardCopied(true);
            }}
          >
            {customUrl}
          </InputGroup.Text>
          <Button
            variant="outline-secondary"
            className="mt-3 text-white"
            onClick={() => {
              copyToClipboard(customUrl);
              setClipboardCopied(true);
            }}
          >
            {!clipboardCopied && "Copy Custom URL to Clipboard"}
            {clipboardCopied && "Copied!"}
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <h3>Impact Play</h3>
        <div className="d-flex flex-wrap">
          {impactPlayList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={impactState[index]}
                onChange={(value) => {
                  setImpactState({ ...impactState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Bondage</h3>
        <div className="d-flex flex-wrap">
          {bondageList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={bondageState[index]}
                onChange={(value) => {
                  setBondageState({ ...bondageState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Sensation Play</h3>
        <div className="d-flex flex-wrap">
          {sensationList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={sensationState[index]}
                onChange={(value) => {
                  setSensationState({ ...sensationState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Intimacy</h3>
        <div className="d-flex flex-wrap">
          {intimacyList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={intimacyState[index]}
                onChange={(value) => {
                  setIntimacyState({ ...intimacyState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Penetration</h3>
        <div className="d-flex flex-wrap">
          {penetrationList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={penetrationState[index]}
                onChange={(value) => {
                  setPenetrationState({ ...penetrationState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>I want to feel</h3>
        <div className="d-flex flex-wrap">
          {feelingsList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={feelingsState[index]}
                onChange={(value) => {
                  setFeelingsState({ ...feelingsState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Safe Words</h3>
        <p>Don't forget to discuss safe words</p>
        <div className="d-flex flex-wrap">
          {safewordList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={safewordState[index]}
                onChange={(value) => {
                  setSafewordState({ ...safewordState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>Marks</h3>
        <div className="d-flex flex-wrap">
          {marksList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={marksState[index]}
                onChange={(value) => {
                  setMarksState({ ...marksState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3>After Care</h3>
        <div className="d-flex flex-wrap">
          {aftercareList.map((i, index) => {
            return (
              <KinkCard
                kink={i}
                key={index}
                value={aftercareState[index]}
                onChange={(value) => {
                  setAftercareState({ ...aftercareState, [index]: value });
                }}
              />
            );
          })}
        </div>
      </div>
      {/* TODO figure out how to have the where I do/don't want to be touched pictures */}
    </div>
  );
}

export default Page;
