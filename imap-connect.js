const { text } = require('body-parser');
const simpleParser = require('mailparser').simpleParser;

var Imap = require('imap'),
    inspect = require('util').inspect;
 
var imap = new Imap({
  user: 'nodejscheck@gmail.com',
  password: 'nodejskyrim!@#',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
 
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}
 
imap.once('ready', async function() {
    openInbox(async function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            if (info.which === 'TEXT')
              console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
              console.log('TEXT',info)
            var buffer = '', count = 0;
            stream.on('data', async function(chunk) {
              count += chunk.length;
              buffer += chunk.toString('utf8');
              var text = buffer.replace(/<\/?[^>]+>/ig, " ");
              let plainText = buffer.replace(/<[^>]+>/g, '');
              console.log("chunk",plainText)
              let value = await simpleParser(buffer)
              console.log("val",value.text)
              if (info.which === 'TEXT')
                console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
            });
            stream.once('end', function() {
              if (info.which !== 'TEXT')
                console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
              else
                console.log(prefix + 'Body [%s] Finished', inspect(info.which));
            });
          });
          msg.once('attributes', function(attrs) {
            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          });
          msg.once('end', function() {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
          console.log('Done fetching all messages!');
          imap.end();
        });
      });
});
 
imap.once('error', function(err) {
  console.log(err);
});
 
imap.once('end', function() {
  console.log('Connection ended');
});
 
imap.connect();

// using the functions and variables already defined in the first example ...
 
