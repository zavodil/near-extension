import {initNear, Social} from "./nearSocial"

let contractAuthAccountId = "";
let currentUserAccountId = "";
let currentReceiverAccountId = "";

const getLastBlockHeightName = (accountId) => `lastBlockHeight-${accountId}`;

const getNotificationsIframe = (e, accountId, lastBlockHeight) => {
    e.preventDefault();
    document.querySelector("#social-notifications-list")?.remove();

    const socialNotificationsIframe = document.createElement("iframe");
    socialNotificationsIframe.id = "social-notifications-list";
    socialNotificationsIframe.style.cssText = "width:365px;height:500px;overflow:hidden;border:0;";
    socialNotificationsIframe.src = `https://near.social/#/embed/zavodil.near/widget/NotificationFeed?accountId=${accountId}`;

    const rightColumn = document.querySelector("div.right");
    rightColumn.insertBefore(socialNotificationsIframe, rightColumn.firstChild);

    localStorage.setItem(getLastBlockHeightName(accountId), lastBlockHeight.toString());

    return false;
}

const renderNotificationButton = (counter, accountId, lastBlockHeight) => {
    document.querySelector("#social-notifications-button")?.remove();

    const notificationsButton = document.createElement("div");
    notificationsButton.id = "social-notifications-button";
    notificationsButton.onclick = (e) => {
        return getNotificationsIframe(e, accountId, lastBlockHeight)
    };

    const inner = !!counter ? `
<div style="background-color: rgb(240, 240, 241); position: absolute; top: 0; right: 0; -webkit-box-align: center; align-items: center; border-radius: 40px; padding: 2px 5px 2px 2px; cursor: pointer; user-select: none; }">
    <div style='z-index: 1; border: 1px solid #72727a; border-radius: 5px; font-size: 10px; color: #72727a; padding: 2px 4px;'> ${counter}</div>
</div>` : "";

    notificationsButton.style.cssText = "padding-right: 10px";
    notificationsButton.innerHTML = `
    <a href="//near.social/#/mob.near/widget/NotificationFeed">
        <div style="width:40px; height: 40px; background-color: #f0f0f1; border-radius: 20px; position: relative"">
            <div style="width:40px; height: 30px; padding-top: 10px">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#72727a" height="100%" width="100%" version="1.1" id="Capa_1" viewBox="0 0 611.999 611.999" xml:space="preserve">
                    <g><g><g><path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203     C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578     c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626     h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856     c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626     C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32     c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082     c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z      M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826     c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485     c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"/><path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258     c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258     C323.259,126.96,315.532,119.235,306.001,119.235z"/></g></g></g>
                </svg>                      
                ${inner}            
        </div>
    </a>`;

    return notificationsButton;
};


async function checkSendMoneyPage() {
    const container = document.querySelector(".small-centered");
    const amount = container.querySelector(".token-amount");
    const parentNode = amount?.parentElement;
    const informationNodes = parentNode?.querySelectorAll(".information") ?? [];
    if (informationNodes.length === 2) {
        const accountId = informationNodes[0].querySelector("div").textContent?.trim()?.toLowerCase();
        const receiverNode = informationNodes[1];
        const receiverId = receiverNode?.querySelector("div")?.textContent?.trim()?.toLowerCase();
        if (!!receiverId && currentReceiverAccountId !== receiverId) {
            currentReceiverAccountId = receiverId;
            const near = await initNear(accountId);
            const social = new Social(near);

            const receiverData = await social.getInner(`${receiverId}/profile/**`, null);
            // remove previous iframe
            document.querySelector("#social-receiver-profile")?.remove();

            const receiverProfileBlock = document.createElement("div");
            receiverProfileBlock.id = "social-receiver-profile"

            if (!!receiverData) {
                const receiverProfileIframe = document.createElement("iframe");
                receiverProfileIframe.setAttribute('scrolling', 'no');
                receiverProfileIframe.style.cssText = "width:400px;height:60px;overflow:hidden;border:0;";
                receiverProfileIframe.src = `https://near.social/#/embed/mob.near/widget/Profile?accountId=${receiverId}`;
                receiverProfileBlock.appendChild(receiverProfileIframe);
            }

            const receiverPublicTagsIframe = document.createElement("iframe");
            receiverPublicTagsIframe.style.cssText = "width:400px;height:60px;overflow:hidden;border:0;";
            receiverPublicTagsIframe.src = `https://near.social/#/embed/mob.near/widget/PublicTags?accountId=${receiverId}`;
            receiverProfileBlock.appendChild(receiverPublicTagsIframe);


            receiverNode.replaceChild(receiverProfileBlock, receiverNode.lastChild);
        }
    }
}

async function currentAccountIntervalChecker() {
    const userAccountContainer = document.querySelector("div.user-account");
    if (!userAccountContainer)
        return;
    const accountId = userAccountContainer?.textContent?.trim()?.toLowerCase();

    if (!accountId || accountId === currentUserAccountId)
        return;

    console.log(`Loading account: ${accountId}`);

    currentUserAccountId = accountId;

    const near = await initNear(accountId);
    const social = new Social(near);

    const profileData = await social.getInner(`${accountId}/profile/**`, null);
    // remove previous iframe
    document.querySelector("#social-profile-image")?.remove();

    if (profileData?.image) {
        const profileImageIframe = document.createElement("iframe");
        profileImageIframe.id = "social-profile-image";
        profileImageIframe.setAttribute('scrolling', 'no');
        profileImageIframe.style.cssText = "width:40px;height:40px;overflow:hidden;border:0;border-radius:20px;";
        const imageStyle = {width: "40px", height: "40px"};
        profileImageIframe.src = `https://near.social/#/embed/zavodil.near/widget/ProfileImage?className=rounded&alt=${profileData.name}&style=${encodeURIComponent(JSON.stringify(imageStyle))}&image=${encodeURIComponent(JSON.stringify(profileData.image))}`;

        const profileImageBlock = userAccountContainer.querySelector("svg.user-icon");

        if (profileImageBlock) {
            profileImageBlock.remove();
        }

        userAccountContainer.insertBefore(profileImageIframe, userAccountContainer.firstChild);
    }

    if (profileData) {
        processContractAuth(social);
        processNotifications(social, accountId, userAccountContainer);
    } else {
        document.querySelector("#social-notifications-button")?.remove();
    }
}


function processNotifications(social, accountId, userAccountContainer) {
    let lastBlockHeight = Number(localStorage.getItem(getLastBlockHeightName(accountId)));

    social.index("notify", accountId, {
        order: "asc",
        from: (lastBlockHeight ?? 0) + 1,
        subscribe: true,
    }).then(notifications => {
        const latestBlockHeight = notifications.length ? notifications[notifications.length - 1]?.blockHeight ?? 0 : 0;

        const notificationsBlock = renderNotificationButton(notifications.length, accountId, latestBlockHeight);
        userAccountContainer.parentNode.insertBefore(notificationsBlock, userAccountContainer);
    });
}


function processContractAuth(social) {
    const tagsCount = {};

    const processTagsObject = (obj) => {
        Object.entries(obj).forEach((kv) => {
            if (kv[1] === null) {
                const tag = kv[0];
                tagsCount[tag] = (tagsCount[tag] || 0) - 1;
            } else if (typeof kv[1] === "object") {
                processTagsObject(kv[1]);
            } else {
                const tag = kv[0];
                tagsCount[tag] = (tagsCount[tag] || 0) + 1;
            }
        });
    };

    const getTags = (tagsObject) => {
        processTagsObject(tagsObject);
        const tags = Object.entries(tagsCount);
        tags.sort((a, b) => Number(b[1]) - Number(a[1]));
        return tags.map((t) => {
            return {
                name: t[0],
                count: t[1],
                title: t[1] + (t[1] > 1 ? " votes" : " vote"),
            };
        });
    };

    const contractAuthIntervalChecker = setInterval(async () => {
        const userInformationBlock = document.querySelector("div.contract-wrapper");
        if (userInformationBlock) {
            const receiverContract = userInformationBlock.querySelector("a")?.textContent?.trim()?.toLowerCase();
            if (contractAuthAccountId !== receiverContract) {
                contractAuthAccountId = receiverContract;
                clearInterval(contractAuthIntervalChecker);

                const tagsData = await social.keys(`*/nametag/${receiverContract}/tags/*`, "final", null);
                const publicTags = getTags(tagsData);

                let loginBlock = document.querySelector("div.confirm-login");
                if (loginBlock) {
                    let loginDescription = loginBlock.querySelector("div.desc");
                    document.querySelector("#social-contract-description")?.remove();

                    const loginContractDescription = document.createElement("div");
                    loginContractDescription.id = "social-contract-description";

                    const publicTagsPrepared = publicTags.map((tag) => (
                        `<a
                  href="//near.social/#/zavodil.near/widget/AllLabels?tag=${tag.name}"
                  class=""text-white btn p-0 lh-1"
              >
                <span
                  class="badge bg-success position-relative"
                  title="${tag.title}"
                  style="${
                            tag.count > 1
                                ? {
                                    marginRight: "0.9em",
                                    paddingRight: "0.85em",
                                }
                                : {marginRight: "0.25em"}
                        }"
                >
              #${tag.name}
              ${tag.count > 1 ? `<span class="badge translate-middle rounded-pill bg-danger position-absolute top-50 start-100>${tag.count}</span>`
                            : ""}
            </span>
                </a>
            `));

                    loginContractDescription.style.cssText = "text-align: center";
                    loginContractDescription.innerHTML = `
                <h6>↓↓↓</h6>
                <h3><a href="https://near.social/#/mob.near/widget/ProfilePage?accountId=${receiverContract}" target="_blank">${receiverContract}</a></h3>
                <div class="text-center">
                    ${publicTagsPrepared.join("")}
                </div>
            `;
                    loginBlock.insertBefore(loginContractDescription, loginDescription)

                    // TODO Place Profile Avatar & Details
                    /*
                    const profileData = await social.getInner(`${receiverContract}/profile/**`, null);
                    if (profileData?.image) {
                      const profileImageIframe = document.createElement("iframe");
                      profileImageIframe.setAttribute('scrolling', 'no');
                      profileImageIframe.style.cssText = "width:40px;height:40px;overflow:hidden;border:0;border-radius:20px;";
                      const imageStyle = {width: "40px", height: "40px"};
                      profileImageIframe.src = `https://near.social/#/embed/zavodil.near/widget/ProfileImage?className=rounded&alt=${profileData.name}&style=${encodeURIComponent(JSON.stringify(imageStyle))}&image=${encodeURIComponent(JSON.stringify(profileData.image))}`;
                    }
                    */
                }
            }
        }
    }, 1000);
}

export const injectTags = async () => {
    const urlType = window.location.pathname.split("/")[1];

    currentAccountIntervalChecker()
        .then(() => setInterval(currentAccountIntervalChecker, 5000));

    let defaultInterval;

    switch (urlType) {
        case "send-money":
            checkSendMoneyPage().then(() => defaultInterval = setInterval(checkSendMoneyPage, 1000));
            break;
        case "address":
            break;
        default:
            clearInterval(defaultInterval);
            break;
    }
};
