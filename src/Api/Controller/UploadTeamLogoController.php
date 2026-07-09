<?php

namespace Bigreja\Bragalotto\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\Paths;
use Flarum\Http\RequestUtil;
use Bigreja\Bragalotto\Api\Serializer\TeamSerializer;
use Bigreja\Bragalotto\Team;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UploadTeamLogoController extends AbstractShowController
{
    public $serializer = TeamSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('bragalotto.manage');

        $id = Arr::get($request->getQueryParams(), 'id') ?? $request->getAttribute('id');
        $team = Team::findOrFail($id);

        $uploadedFiles = $request->getUploadedFiles();
        $file = Arr::get($uploadedFiles, 'logo');

        if (!$file || $file->getError() !== UPLOAD_ERR_OK) {
            throw new \InvalidArgumentException('No valid file uploaded.');
        }

        // Validate extension
        $extension = strtolower(pathinfo($file->getClientFilename(), PATHINFO_EXTENSION));
        if (!in_array($extension, ['png', 'svg'])) {
            throw new \InvalidArgumentException('Only PNG and SVG files are allowed.');
        }

        // Validate actual MIME type using the PHP tmp path directly.
        // DO NOT call $file->getStream() here — reading the stream advances its
        // pointer and causes moveTo() to write an empty file afterwards.
        $tmpPath = $_FILES['logo']['tmp_name'] ?? null;
        if ($tmpPath && file_exists($tmpPath)) {
            $mimeType = (new \finfo(FILEINFO_MIME_TYPE))->file($tmpPath);
            if (!in_array($mimeType, ['image/png', 'image/svg+xml'])) {
                throw new \InvalidArgumentException('Only PNG and SVG files are allowed.');
            }
        }

        // Prepare storage directory
        $paths = resolve(Paths::class);
        $targetDir = $paths->public . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'bragalotto' . DIRECTORY_SEPARATOR . 'teams';

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        // Delete old local file
        if ($team->logo_path && !Str::startsWith($team->logo_path, ['http://', 'https://'])) {
            $oldFile = $paths->public . DIRECTORY_SEPARATOR . ltrim(str_replace('/', DIRECTORY_SEPARATOR, $team->logo_path), DIRECTORY_SEPARATOR);
            if (file_exists($oldFile)) {
                @unlink($oldFile);
            }
        }

        // Move uploaded file to storage
        $filename = Str::random(40) . '.' . $extension;
        $file->moveTo($targetDir . DIRECTORY_SEPARATOR . $filename);

        $team->logo_path = 'assets/bragalotto/teams/' . $filename;
        $team->save();

        return $team;
    }
}
