---
title: Public Key Encryption
layout: contentbase
---
Public Key Encryption
======

This form of asymmetric encryption works on two keys, a public key and a private
key. Encoding a message with a public key allows the message to be decrypted
with the private key.

## Vulnerabilities
* Intermediaries are able to see the metadata of the sent message (sender's
  address, recipient's address, subject line, timestamp).
* An impostor could send their public key, this a Man-in-the-middle attack. MITM
  attacks are tackled by sending the public key through a variety of routes to
  ensure that the recipient gets the intended public key and not an impostor's.

## Message Signing
A message encrypted using a private key can be decrypted using a public key.
This validates the sender's identity and prevents impersonation as well. It also
prevents message tampering in its encrypted form.

## PGP
PGP (Pretty Good Privacy) is an example of a protocol that uses both symmetric
and asymmetric cryptography. In PGP, a certificate is essentially a public key.
PGP stores its public keys in the `.asc` extension.

## Public Key Encryption Usage on Linux

```
ssh-keygen -t rsa
```

This command creates a public/private keypair. It provides the option of
encrypting the private key, but that means you must supply the passphrase each
time you use it. This prevents attackers from using your stolen key.

```
id_rsa
id_rsa.pub
```

The command generates two files, `id_rsa` is your private key and `id_rsa.pub`
is your public key. To log on to remote systems without supplying a password, 
copy the public key to the `authorized_keys` file on the remote system.

```
cat ~/.ssh/id_rsa.pub | ssh user@hostname "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >>  ~/.ssh/authorized_keys"
```
The following method is also a convenient alternative
```
ssh-copy-id user@hostname
```

To set aliases for hosts and default usernames for them as well, a `config` file
can be created as well.

```
Host amazon1
    HostName ec2.amazon.com
    User ec2-user
    IdentityFile /path/to/special/privatekey/amazonKey
    ServerAliveInterval 60
    ServerAliveCountMax 30
```
`ServerAliveInterval` option will refresh your session every 60 seconds in order
to keep it open, `ServerAliveCountMax` option specifies that this should only be
performed 30 times, thus ensuring your session won’t time-out for at least 30
minutes of inactivity. Don't forget to also run:

```
chmod 600 ~/.ssh/config
```

Now you can go ahead and log into your user profile and you will not be prompted
for a password. However, if you set a passphrase when creating your SSH key, you
will be asked to enter the passphrase at each time unless you add it to the
keyring.

To improve security you can disable standard password authentication and enforce
key-based authentication only.
```
# vi /etc/ssh/sshd_config
PasswordAuthentication no
```
This prevents users whose keys aren't in the `authorized_keys` file of the
server to connect to it.


### Miscellaneous commands
* Generate the corresponding public key using a private key
```
ssh-keygen -y
```


