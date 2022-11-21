import classes from "./classes";
import methods from "./methods";

describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://host.togee.io");
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
    const openViewer = () => {
      let url;
      cy.get(`.${classes.inviteButton}`).click({ force: true });

      cy.get(`.${classes.inviteButton}`).should(($elem) => {
        if (!$elem) {
          throw new Error("Strong Element not found");
        }

        url = $elem[0].getAttribute("data-invitation");
        // alert(url);
        var strWindowFeatures =
          "location=yes,height=720,width=1280,scrollbars=yes,status=yes";
        window.open(url, "_blank", strWindowFeatures);
      });
    };
    const allowScreenShare = () => {
      const constraints = {
        //disables the audio media content in the resulting media stream
        audio: false,
        video: {
          width: 1200,
          height: 800,
        },
        // Inherently sets video content to true or "required"
      };
      return window.navigator.mediaDevices.getUserMedia(constraints);
    };

    roomSelection();
    cy.wait(6 * 1000);
    cy.get(`.${classes.camera}`).click();

    // enabling camera
    // cy.wait(5000);
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
    allowScreenShare();

    cy.wait(5 * 1000);
    cy.wait(5 * 60 * 1000);
    openViewer();
    return endRoom();
  });
});
