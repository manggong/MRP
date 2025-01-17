#!/bin/bash

set -e

starttime=$(date +%s)


CC_SRC_VERSION=${1}
CC_SRC_NAME=mrpChainCode_$CC_SRC_VERSION

CC_RUNTIME_LANGUAGE=node
CC_SRC_PATH=/opt/gopath/src/github.com/mrp


CONFIG_ROOT=/opt/gopath/src/github.com/hyperledger/fabric/peer
ORG1_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
ORG1_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
ORG2_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
ORG2_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
ORDERER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
set -x


echo "Instantiating smart contract on mychannel"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  cli \
  peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n "$CC_SRC_NAME" -l "$CC_RUNTIME_LANGUAGE" -v 1.0 -c '{"Args":[]}' -P "OR('Org1MSP.member','Org2MSP.member')" --tls --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles $ORG1_TLS_ROOTCERT_FILE

echo "Waiting for instantiation request to be committed ..."
sleep 10

set +x













