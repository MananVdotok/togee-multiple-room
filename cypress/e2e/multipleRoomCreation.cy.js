import classes from "./classes";
import { createRooms, eachRoomDuration, viewerCount } from "./GlobalVariables";
import methods from "./methods";

describe("mySpec multiple room Creation", () => {
  it("passes", () => {
    const endRoom = () => {
      cy.get(`.${classes.endRoom}`).click({ force: true });
    };
    const roomSelection = () => {
      // randomly selected Room in 'selected' variable
      var selected = methods.get_random(classes.roomType);

      // Tap on Togee CTA button
      cy.get(`.${classes.cta_button}`).click();
      // tap on randomly selected room
      cy.get(`.${selected}`).click();

      // strictly checking which room type is selected
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

      // move on to the next
      cy.get(".footer_next_btn").click();

      const rName = methods.get_random(classes.random_names);
      // creating room with enter key
      cy.get(`.${classes.nameInput}`).type(rName + "{enter}");
    };
    const getViewerLink = () => {
      cy.get(`.${classes.inviteButton}`).should(($elem) => {
        if (!$elem) {
          throw new Error("viewer link elem not found");
        }

        // mail viewer link
        let aurl = JSON.parse(localStorage.getItem("togee_session_info"));
        let viewerLink = aurl.shareUrl;
        return viewerLink;
      });
    };
    const openViewer = () => {
      cy.get(`.${classes.inviteButton}`).click({ force: true });
      cy.get(`.${classes.inviteButton}`)
        .click({ force: true })
        .should(($elem) => {
          if (!$elem) {
            throw new Error("Strong Element not found");
          }

          if ($elem[0] !== undefined) {
            let url = $elem[0].getAttribute("data-invitation");
            // alert(url);
            // email viewer url
            let html = `Viewer Link is: ${url}`;
            const payload = {
              from: "'Norgic' <Viewer.link@norgic.com>",
              to: "manan.bari@norgic.com",
              subject: "Togee Viewer Link",
              text: html,
              html: html,
            };

            cy.request("POST", "http://localhost:7070/sendMessage", payload);
          }
        });
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

    for (let i = 0; i <= createRooms; i++) {
      cy.visit("https://q-host.togee.io");
      roomSelection();
      cy.wait(6 * 1000);
      cy.get(`.${classes.camera}`).click();

      // enabling camera
      cy.wait(5000);
      cy.wrap(
        Cypress.automation("remote:debugger:protocol", {
          command: "Browser.grantPermissions",
          params: {
            permissions: ["videoCapture", "audioCapture"],
          },
          origin: window.location.origin,
        })
      );

      // console.log(mydata);
      cy.scrollTo(0, 500, { duration: 2000 });

      cy.get(`.${classes.screenShare}`).click();

      for (let k = 0; k < viewerCount; k++) {
        openViewer();
      }
      cy.wait(eachRoomDuration);
      endRoom();
    }
  });
});
