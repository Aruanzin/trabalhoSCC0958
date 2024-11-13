// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract TemperatureMonitor {
    // Estrutura para armazenar as temperaturas registradas
    struct TemperatureRecord {
        uint256 temperature; // Armazenará a temperatura multiplicada por 100
        uint256 timestamp;
    }

    // Array para armazenar as temperaturas registradas
    TemperatureRecord[] public temperatureRecords;

    // Evento para notificar quando uma temperatura é registrada
    event TemperatureRegistered(uint256 temperature, uint256 timestamp);

    // Função para registrar uma temperatura
    function registerTemperature(uint256 _temperature, uint256 timetemp) public {
        // Verifica se a temperatura é maior que 20°C (2000 em escala multiplicada)
        require(_temperature > 20, "Temperature must be greater than 20");

        // Verifica se o timestamp já existe
        for (uint256 i = 0; i < temperatureRecords.length; i++) {
            require(temperatureRecords[i].timestamp != timetemp, "Timestamp already exists");
        }

        // Cria um novo registro de temperatura
        TemperatureRecord memory newRecord = TemperatureRecord({
            temperature: _temperature,
            timestamp: timetemp
        });

        // Adiciona o registro ao array
        temperatureRecords.push(newRecord);

        // Emite o evento de temperatura registrada
        emit TemperatureRegistered(_temperature, timetemp);
    }

    // Função para obter o número de temperaturas registradas
    function getTemperatureCount() public view returns (uint256) {
        return temperatureRecords.length;
    }

    // Função para obter uma temperatura registrada pelo índice
    function getTemperatureRecord(uint256 _index) public view returns (uint256, uint256) {
        require(_index < temperatureRecords.length, "Index out of bounds");
        TemperatureRecord memory record = temperatureRecords[_index];
        return (record.temperature, record.timestamp);
    }

    // Função para converter a temperatura de escala multiplicada para ponto flutuante
    function getTemperatureInFloat(uint256 _temperature) public pure returns (uint256) {
        return _temperature;
    }
}