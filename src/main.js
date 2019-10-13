        var host = location.origin.replace(/^http/, 'ws');
        var socket = io(host);
        socket.on('chargeSucceeded', function (charge) {
            var chargeLi = $('<li class="successful-charge"></li>');
            $(chargeLi).text("CHARGE SUCCESSFUL for $"+(charge.amount/100).toFixed(2));
            $('#charges').prepend(chargeLi);
            if (charge.amount > 49900) {
                document.getElementById('money_money').play();
            } else {
                document.getElementById('cash_register').play();
            }
        });

        socket.on('chargeFailed', function (charge) {
            var chargeLi = $('<li class="failed-charge"></li>');
            $(chargeLi).text("CHARGE FAILED/REFUNDED for $"+(charge.amount/100).toFixed(2));
            $('#charges').prepend(chargeLi);
            document.getElementById('denied').play();
        });

        socket.on('trainDone', function (charge) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("CIRCLECI: production deployed");
            $('#charges').prepend(chargeLi);
            document.getElementById('choochoo').play();
        });

        socket.on('trainCrashed', function (data) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("CIRCLECLI: FAILED deploying production");
            $('#charges').prepend(chargeLi);
            document.getElementById('crashed').play();
        });

        socket.on('downtime', function (environment) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("SITE IS DOWN");
            $('#charges').prepend(chargeLi);
            document.getElementById('siren').play();
            setTimeout(speak(environment+ " is down - I repeat - "+environment+" is down.", "UK English Female"), 10000);
        });

        socket.on('applause', function (data) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("Yay!");
            $('#charges').prepend(chargeLi);
            document.getElementById('applause').play();
        });

        socket.on('deploy', function (data) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("New deploy; refreshing in 30 seconds");
            $('#charges').prepend(chargeLi);
            setTimeout(function() { location.reload(); }, 30000);
        });

        socket.on('ten', function (data) {
            var chargeLi = $('<li class="train-ride"></li>');
            $(chargeLi).text("I give it a ten!");
            $('#charges').prepend(chargeLi);
            document.getElementById('ten').play();
        });

        socket.on('rimShot', function (data) {
            document.getElementById('rimShot').play();
        });

        socket.on('liveChat', function (data) {
            var chargeLi = $('<li></li>');
            $(chargeLi).text("Live chat needs attention!");
            $('#charges').prepend(chargeLi);
            document.getElementById('liveChat').play();
        });

        socket.on('friday', function (data) {
            var chargeLi = $('<li></li>');
            $(chargeLi).text("It's Friday!");
            $('#charges').prepend(chargeLi);
            document.getElementById('friday').play();
        });

        socket.on('rooster', function (data) {
            document.getElementById('rooster').play();
        });

        socket.on('dixiehorn', function (data) {
            document.getElementById('dixiehorn').play();
        });

        socket.on('submarine', function (data) {
            document.getElementById('submarine').play();
        });

        socket.on('baby', function (data) {
            document.getElementById('baby').play();
        });

        socket.on('refresh', function (data) {
            location.reload();
        });

        socket.on('anyURL', function (url) {
            var audio = new Audio(decodeURIComponent(url));
            audio.controls = true;
            var chargeLi = $('<li class="any-player"></li>');
            chargeLi.html(audio.outerHTML);
            $('#charges').prepend(chargeLi);
            if ($('audio').first().prop('volume')) { $(".any-player audio")[0].volume = $('audio').first().prop('volume'); }
            $(".any-player audio")[0].play();
            chargeLi = $('<li class="play-anything"></li>');
            $(chargeLi).text("Played: "+url);
            $('#charges').prepend(chargeLi);
        });

        socket.on('speak', function (text, voice) {
            speak(text, voice);
        });

        var old_volume;
        socket.on('volume', function (new_volume) {
            var play_volume;
            if (new_volume === "mute") {
                play_volume = 0;
            } else if (new_volume === "unmute") {
                play_volume = old_volume || 1;
                old_volume = play_volume;
            } else if (new_volume === "up") {
                play_volume = $('audio').prop('volume') + 0.2;
                old_volume = play_volume;
            } else if (new_volume === "down") {
                play_volume = $('audio').prop('volume') - 0.2;
                old_volume = play_volume;
            } else {
                play_volume = parseFloat(new_volume.replace(/[^0-9\.]+/g,''));
                old_volume = play_volume;
            }
            $('audio').prop('volume',play_volume);
        });

        // refresh page every 5 minutes
        setTimeout(function() {
            location.reload();
        }, 3600000);

        var speak = function(text, voice) {
            responsiveVoice.speak(text, voice);
            var chargeLi = $('<li class="play-anything"></li>');
            $(chargeLi).text("Spoke: "+text+" by "+voice);
            $('#charges').prepend(chargeLi);
        };