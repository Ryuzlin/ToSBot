const config = require('./../config/config');

let spam = [];

module.exports = {
    spam: spam,

    calculateDamage: calculateDamage,
    calculateDodge: calculateDodge,
    calculateCritical: calculateCritical,
    calculateBlock: calculateBlock,
    help: help
};

function calculateDamage(arg, msg, client) {
    if(isSpam(msg)) return;

    let retMsg = undefined;
    let percent = undefined;
    let dmg = undefined;
    let rev = undefined;

    if(isNaN(arg[1])) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    } else if (arg[1] < 0 || arg[1] > 1000000) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    }

    if(arg[0].indexOf("-rev") !== -1) rev = true; else rev = false;

    if(rev) retMsg = "Attack: " + arg[1] + "\n\n";
    else retMsg = "Defense: " + arg[1] + "\n\n";

    for(let index = 2; index < arg.length; index++) {
        if (isNaN(arg[index])) { continue; }
        else if (arg[index] < 0 || arg[index] > 1000000 ) { continue; }

        if(rev) { dmg = damage(arg[index], arg[1]); }
        else { dmg = damage(arg[1], arg[index]); }
        
        if(rev) { percent = Math.round((dmg / arg[1]) * 100) - 100; }
        else { percent = Math.round((dmg / arg[index]) * 100) - 100; }

        if(rev) { retMsg += "Defense " + arg[index] + " = " + dmg + " damage (" + percent + "%)" + "\n"; }
        else { retMsg += "Attack " + arg[index] + " = " + dmg + " damage (" + percent + "%)" + "\n"; }
    }

    retMsg = "```coffeescript\n" + retMsg + "```";

    replyMsg(msg, arg, retMsg);
}

function calculateDodge(arg, msg, client) { 
    if(isSpam(msg)) return;

    let retMsg = undefined;
    let value = undefined;
    let rev = undefined;

    if(isNaN(arg[1])) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    } else if (arg[1] < 0 || arg[1] > 1000000) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    }

    if(arg[0].indexOf("-rev") !== -1) rev = true; else rev = false;

    if(rev) retMsg = "Accuracy: " + arg[1] + "\n\n";
    else retMsg = "Dodge rate: " + arg[1] + "\n\n";

    for(let index = 2; index < arg.length; index++) {
        if (isNaN(arg[index])) { continue; }
        else if (arg[index] < 0 || arg[index] > 1000000 ) { continue; }

        if(rev) value = dodge(arg[index], arg[1]);
        else value = dodge(arg[1], arg[index]);

        if (value > 100) value = 100;
        
        if(rev) retMsg += "Dodge rate " + arg[index] + " = " + value + "% dodge\n";
        else retMsg += "Accuracy " + arg[index] + " = " + value + "% dodge\n";
    }

    retMsg = "```coffeescript\n" + retMsg + "```";

    replyMsg(msg, arg, retMsg);
}

function calculateCritical(arg, msg, client) { 
    if(isSpam(msg)) return;

    let retMsg = undefined;
    let value = undefined;
    let rev = undefined;

    if(isNaN(arg[1])) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    } else if (arg[1] < 0 || arg[1] > 1000000) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    }

    if(arg[0].indexOf("-rev") !== -1) rev = true; else rev = false;

    if(rev) retMsg = "Critical resistance: " + arg[1] + "\n\n";
    else retMsg = "Critical rate: " + arg[1] + "\n\n";

    for(let index = 2; index < arg.length; index++) {
        if (isNaN(arg[index])) { continue; }
        else if (arg[index] < 0 || arg[index] > 1000000 ) { continue; }

        if(rev) value = critical(arg[index], arg[1]);
        else value = critical(arg[1], arg[index]);

        if (value > 100) value = 100;

        if(rev) retMsg += "Critical rate " + arg[index] + " = " + value + "% critical\n";
        else retMsg += "Critical resistance " + arg[index] + " = " + value + "% critical\n";
    }

    retMsg = "```coffeescript\n" + retMsg + "```";

    replyMsg(msg, arg, retMsg);
}

function calculateBlock(arg, msg, client) { 
    if(isSpam(msg)) return;

    let retMsg = undefined;
    let value = undefined;
    let rev = undefined;

    if(isNaN(arg[1])) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    } else if (arg[1] < 0 || arg[1] > 1000000) {
        replyMsg(msg, arg, "ERRO: Argumento inválido");
        return;
    }

    if(arg[0].indexOf("-rev") !== -1) rev = true; else rev = false;

    if(rev) retMsg = "Block penetration: " + arg[1] + "\n\n";
    else retMsg = "Block rate: " + arg[1] + "\n\n";

    for(let index = 2; index < arg.length; index++) {
        if (isNaN(arg[index])) { continue; }
        else if (arg[index] < 0 || arg[index] > 1000000 ) { continue; }

        if(rev) value = block(arg[index], arg[1]);
        else value = block(arg[1], arg[index]);
        
        if (value > 100) value = 100;

        if(rev) retMsg += "Block rate " + arg[index] + " = " + value + "% block\n";
        else retMsg += "Block penetration " + arg[index] + " = " + value + "% block\n";
    }

    retMsg = "```coffeescript\n" + retMsg + "```";

    replyMsg(msg, arg, retMsg);
}



function help(arg, msg, client) {
    if(isSpam(msg)) return;
    let retMsg = undefined;

    retMsg = "Lista de comandos:\n\n" +
        "**!calcDmg(-pvt)** [def] [atk1] [atk2] ...\n" +
        "**!calcDmg-rev(-pvt)** [atk] [def1] [def2] ...\n" +
        "\n" +
        "**!calcDodge(-pvt)** [dodge rate] [accuracy1] [accuracy2] ...\n" +
        "**!calcDodge-rev(-pvt)** [accuracy] [dodge rate1] [dodge rate2] ...\n" +
        "\n" +
        "**!calcCrit(-pvt)** [crit rate] [crit resistance1] [crit resistance2] ...\n" +
        "**!calcCrit-rev(-pvt)** [crit resistance] [crit rate1] [crit rate2] ...\n" +
        "\n" +
        "**!calcBlock(-pvt)** [block rate] [block pen1] [block pen2] ...\n" +
        "**!calcBlock-rev(-pvt)** [block pen] [block rate1] [block rate2] ...\n";

    replyMsg(msg, arg, retMsg);
}


//-------------------------------------------------------------------------------------------------------------


function damage(defense, attack){
    let a = undefined;
    let b = undefined;
    let c = undefined;
    let d = undefined;

    console.log("\nAttack = " + attack + "\nDefense = " + defense + "\n");

    defense++;

    a = attack / defense;
    console.log("a: " + a);

    b = Math.pow(a, 0.8) + 1;
    console.log("b: " + b);

    c = Math.min(1, Math.log10(b));
    console.log("c: " + c);

    d = attack * 1 * c + 0;
    console.log("d: " + d);

    return Math.round(d);
}

function critical(rate, resistance) {
    return Math.round(Math.pow(Math.max(0, rate-resistance), 0.6));
}

function dodge(rate, accuracy) {
    return Math.round(Math.pow(Math.max(0, rate-accuracy), 0.65));
}

function block(rate, penetration) {
    return Math.round(Math.pow(Math.max(0, rate-penetration), 0.7));
}






function isSpam(msg) {
    let userSpam = spam.find((user) => { return user.id === msg.author.id});

    if (typeof userSpam === 'undefined') {
        spam.push({id:msg.author.id});

        setTimeout(function () {
            let index = (spam.map((arr) => arr.id)).indexOf(msg.author.id);
            if (index != -1) spam.splice(index, 1);
        }, config.spamTimeout);

        return false;
    } 
    msg.reply("SPAM!");
    return true;
}

function replyMsg(msg, arg, retMsg) {
    if(arg[0].endsWith("-pvt")) {
        msg.author.send(retMsg);
    } else {
        msg.channel.send(retMsg);
    }
}
