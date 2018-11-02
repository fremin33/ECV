<?php
require __DIR__ . '/vendor/autoload.php';

use Command\DefaultCommand;
use Symfony\Component\Console\Application;

$application = new Application('echo', '1.0.0');
$command = new DefaultCommand();

$application->add($command);
// $application->setDefaultCommand($command->getName(), true);

$application->run();
