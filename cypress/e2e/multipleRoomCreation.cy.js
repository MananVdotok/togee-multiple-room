import classes from "./classes";
import { createRooms, eachRoomDuration, viewerCount } from "./GlobalVariables";
import methods from "./methods";

//methods

const endRoom = () => {
  cy.get(`.${classes.endRoom}`).click({ force: true });
};
const roomSelection = () => {
  // randomly selected Room in 'selected' variable
  var selected = methods.get_random(classes.roomType);

  // Tap on Togee CTA button
  it("Check CTA button is present..?", () => {
    cy.get(`.${classes.cta_button}`).click();
  });
  // tap on randomly selected room

  it("select a random room", () => {
    cy.get(`.${selected}`).click();
  });

  // strictly checking which room type is selected
  it("assertion which room type is selected", () => {
    cy.get("strong.focus_card_text").should(($strong) => {
      // through error if 'stron element not found'
      if (!$strong) {
        throw new Error("Strong Element not found");
      }

      // Condition to strictly check room type with below avalible
      // Bold room type text
      selected === "togee_card1"
        ? expect($strong).to.have.text("Public room")
        : expect($strong).to.have.text("Private room");
    });
  });

  // move on to the next
  it("click on next button after slecting room type", () => {
    cy.get(".footer_next_btn").click();
  });

  const rName = methods.get_random(classes.random_names);
  // creating room with enter key
  it("Enter a random name room", () => {
    cy.get(`.${classes.nameInput}`).type(rName + "{enter}");
  });
};
const getViewerLink = () => {
  // cy.get(`.${classes.inviteButton}`).click({ force: true });
  cy.get(`.${classes.inviteButton}`)
    .click({ force: true })
    .should(($elem) => {
      if (!$elem) {
        throw new Error("Strong Element not found");
      }

      if ($elem[0] !== undefined) {
        let url = $elem[0].getAttribute("data-invitation");
        // cy.writeFile("data.json", { viewerLink: `${url}` });
        // alert(url);
        // email viewer url
        const emailList = [
          // "manan.bari@norgic.com",
          // "bilal.muhammad@norgic.com",
          "aleem.asghar@vdotok.com",
        ];
        for (let i = 0; i < emailList.length; i++) {
          let a = document.createElement("a");
          a.setAttribute("href", url);
          a.setAttribute("target", "_blank");
          a.innerHTML = "Viewer Link";
          console.warn(a, "I am linkkkkk");
          let html = `<b>Click to open Viewer Link:</b><a href=${url} target="_blank">Viewer Link <\/a>`;
          const payload = {
            from: "'Norgic' <togee.link@norgic.com>",
            to: emailList[i],
            subject: "Togee Viewer Link",
            text: html,
            html: html,
          };

          cy.request("http://localhost:7070/hi");
          cy.wait(5000);
        }
        cy.wait(5000);
      }
    });
};
const openViewer = () => {
  cy.get(`.${classes.inviteButton}`)
    .click({ force: true })
    .should(($elem) => {
      if (!$elem) {
        throw new Error("Strong Element not found");
      }

      let url;

      url = $elem[0].getAttribute("data-invitation");
      // alert(url);
      var strWindowFeatures =
        "location=yes,height=720,width=1280,scrollbars=yes,status=yes";
      window.open(url, "_blank", strWindowFeatures);
    });
};

// cypress script ---------------------------------------------------------------------------------------

describe("mySpec multiple room Creation", () => {
  context("togee smoke exe", () => {
    for (let i = 0; i < createRooms; i++) {
      it("visiting togee q environment", () => {
        cy.visit("https://q-host.togee.io");
        cy.wait(5000);
      });

      roomSelection();

      it("wait for room cration", () => {
        cy.wait(6 * 1000);
      });

      it("send viewer link to email", () => {
        getViewerLink();
        cy.wait(6000);
      });

      // enabling camera
      it("enable camera", () => {
        cy.get(`.${classes.camera}`).click();
        cy.wait(5000);
      });

      it("allow camera and screenshare permiss", () => {
        cy.wrap(
          Cypress.automation("remote:debugger:protocol", {
            command: "Browser.grantPermissions",
            params: {
              permissions: ["videoCapture", "audioCapture"],
            },
            origin: window.location.origin,
          })
        );
      });

      // console.log(mydata);
      it("scroll webpage before vieweropen", () => {
        cy.scrollTo(0, 500, { duration: 2000 });
        cy.scrollTo(0, -500, { duration: 2000 });

        cy.get(`.${classes.screenShare}`).click();
      });

      it("open viewer", () => {
        for (let k = 0; k < viewerCount; k++) {
          openViewer();
        }
      });

      it("scroll webpage after viewer open", () => {
        cy.scrollTo(0, 1000, { duration: 5000 });
        cy.scrollTo(0, -1000, { duration: 5000 });
      });
      it("wait room before end the room", () => {
        cy.wait(eachRoomDuration);
      });

      it("end room", () => {
        endRoom();
      });
    }
  });
});
