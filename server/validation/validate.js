module.exports.validateInput = obj => {
    // console.log("obj!!!!!!!",obj)
    // update userbasicinfo
    // { key: 'username', value: '柯基的守护者' }

    // addActivity
    //  { theme: 'af',
    // location: '石家庄市 河北省',
    // departdate: '28 Feb 2018 5:53',
    // finishdate: '07 Mar 2018 5:53',
    // budget: '21',
    // services: [ '徒步旅行' ],
    // story: 'a',
    // }

    if (obj.theme && obj.theme.length > 20) {
        return false;
    }
    if (obj.story && obj.story.length > 20) {
        return false;
    }

    if (obj.services && obj.services.length && obj.services.length === 0) {
        return false;
    }

    if (
        obj.budget &&
        (Number.isNaN(Number(obj.budget)) || Number(obj.budget) <= 0)
    ) {
        return false;
    }

    if (
        obj.yearOfLiving &&
        (Number.isNaN(Number(obj.yearOfLiving)) ||
            Number(obj.yearOfLiving) <= 0)
    ) {
        return false;
    }
};