module.exports = function (data) {
  const currAnalysis = data.data.analyses.content[0];
  if (!currAnalysis) {
    return reject(`Analysis is empty!`);
  }

  for (const run of currAnalysis.completedRuns) {
    if (run.publishedAnalyses.length > 0) {
      return reject(`Analysis with ID ${currAnalysis.analysisId} has already been aligned!`);
    }
  }

  return {
    analysis_id: currAnalysis.analysisId,
    study_id: currAnalysis.studyId,
    score_url: 'https://score.rdpc-dev.cancercollaboratory.org',
    song_url: 'https://song.rdpc-dev.cancercollaboratory.org',
    cpus: 2,
    mem: 4,
    ref_genome_fa: '<SCHEDULED_DIR>/reference/GRCh38_hla_decoy_ebv/GRCh38_hla_decoy_ebv.fa',
    download: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
      score_url: 'https://submission-score.rdpc-dev.cancercollaboratory.org',
      song_url: 'https://submission-song.rdpc-dev.cancercollaboratory.org',
    },
    seqDataToLaneBam: {
      cpus: 4,
      mem: 12,
    },
    bwaMemAligner: {
      cpus: 6,
      mem: 18,
    },
    bamMergeSortMarkdup: {
      cpus: 4,
      mem: 18,
    },
    payloadGenDnaAlignment: {
      cpus: 2,
      mem: 4,
    },
    readGroupUBamQC: {
      cpus: 3,
      mem: 6,
    },
    alignedSeqQC: {
      cpus: 4,
      mem: 10,
    },
    gatkCollectOxogMetrics: {
      cpus: 3,
      mem: 6,
    },
    payloadGenDnaSeqQc: {
      cpus: 2,
      mem: 2,
    },
    uploadAlignment: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
    },
    uploadQc: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 2,
      score_mem: 4,
    },
    tempdir: '/icgc-argo-scratch',
    cleanup: true,
    max_retries: 5,
    first_retry_wait_time: 60,
  };
};
